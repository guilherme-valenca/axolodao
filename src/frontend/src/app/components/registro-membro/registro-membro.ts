import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ethers } from 'ethers';
import { Web3Service } from '../../services/web3';
import { RelayerService } from '../../services/relayer.service';
import { environment } from '../../../environments/environment';

const ABI_ENS_REGISTRY = [
  'function setSubnodeOwner(bytes32 node, bytes32 label, address owner) returns (bytes32)',
  'function setResolver(bytes32 node, address resolver)',
  'function owner(bytes32 node) view returns (address)',
];

const ABI_ENS_RESOLVER = [
  'function setAddr(bytes32 node, address a)',
];

interface LogEntry {
  hora: string;
  mensagem: string;
  status: 'pendente' | 'ok' | 'erro';
}

@Component({
  selector: 'app-registro-membro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-membro.html',
  styleUrls: ['./registro-membro.css'],
})
export class RegistroMembro {
  private web3 = inject(Web3Service);
  private relayer = inject(RelayerService);
  private cdr = inject(ChangeDetectorRef);

  instLabel = '';
  userLabel = '';
  userAddress = '';
  resolverAddress = environment.ensResolver;

  parentNodePreview = '';
  userNodePreview = '';
  ensPreview = '';

  processando = false;
  logs: LogEntry[] = [];

  atualizarPreviews(): void {
    const inst = this.instLabel.trim().toLowerCase();
    const user = this.userLabel.trim().toLowerCase();

    if (inst) {
      this.parentNodePreview = ethers.namehash(inst + '.axolodao2.eth');
    } else {
      this.parentNodePreview = '';
    }

    if (inst && user) {
      const fullName = user + '.' + inst + '.axolodao2.eth';
      this.userNodePreview = ethers.namehash(fullName);
      this.ensPreview = fullName;
    } else {
      this.userNodePreview = '';
      this.ensPreview = '';
    }
  }

  async registrarMembro(): Promise<void> {
    const instLabel = this.instLabel.trim().toLowerCase();
    const userLabel = this.userLabel.trim().toLowerCase();
    const userAddr = this.userAddress.trim();
    const resolverAddr = this.resolverAddress.trim();

    if (!instLabel || !userLabel || !userAddr || !resolverAddr) {
      this.addLog('Preencha todos os campos.', 'erro');
      return;
    }

    if (!userAddr.startsWith('0x') || userAddr.length !== 42) {
      this.addLog('Endereço da carteira inválido.', 'erro');
      return;
    }

    this.processando = true;
    this.logs = [];
    this.cdr.detectChanges();

    const signer = this.web3.signer;
    if (!signer) {
      this.addLog('Carteira não conectada.', 'erro');
      this.processando = false;
      return;
    }

    const gerenteAddr = await signer.getAddress();
    const parentNode = ethers.namehash(instLabel + '.axolodao2.eth');
    const userLabelHash = ethers.keccak256(ethers.toUtf8Bytes(userLabel));
    const userNode = ethers.namehash(userLabel + '.' + instLabel + '.axolodao2.eth');

    const ensRegistry = new ethers.Contract(environment.ensRegistry, ABI_ENS_REGISTRY, signer);
    const resolver = new ethers.Contract(resolverAddr, ABI_ENS_RESOLVER, signer);

    try {
      // TX 1/4: Criar subdomínio (gerente como dono temporário)
      this.addLog('Tx 1/4: Criando subdomínio ENS...', 'pendente');
      const tx1 = await ensRegistry['setSubnodeOwner'](parentNode, userLabelHash, gerenteAddr);
      const r1 = await tx1.wait();
      this.updateLastLog(`Tx 1/4: Subdomínio criado — Bloco #${r1.blockNumber}`, 'ok');

      // TX 2/4: Configurar resolver
      this.addLog('Tx 2/4: Configurando resolver...', 'pendente');
      const tx2 = await ensRegistry['setResolver'](userNode, resolverAddr);
      const r2 = await tx2.wait();
      this.updateLastLog(`Tx 2/4: Resolver configurado — Bloco #${r2.blockNumber}`, 'ok');

      // TX 3/4: Associar carteira ao nome
      this.addLog('Tx 3/4: Vinculando carteira ao ENS...', 'pendente');
      const tx3 = await resolver['setAddr(bytes32,address)'](userNode, userAddr);
      const r3 = await tx3.wait();
      this.updateLastLog(`Tx 3/4: Carteira vinculada — Bloco #${r3.blockNumber}`, 'ok');

      // TX 4/4: Transferir ownership ao membro
      this.addLog('Tx 4/4: Transferindo ownership ao membro...', 'pendente');
      const tx4 = await ensRegistry['setSubnodeOwner'](parentNode, userLabelHash, userAddr);
      const r4 = await tx4.wait();
      this.updateLastLog(`Tx 4/4: Ownership transferida — Bloco #${r4.blockNumber}`, 'ok');

      this.addLog('Sincronizando subdomínio no inventário local do projeto...', 'pendente');
      try {
        await this.relayer.registerEnsMemberInventory({
          instLabel,
          userLabel,
          userAddress: userAddr,
          resolverAddress: resolverAddr,
        });
        this.updateLastLog('Inventário local atualizado com sucesso.', 'ok');
      } catch (inventoryError: any) {
        const inventoryMsg = inventoryError?.message || String(inventoryError);
        this.updateLastLog(
          `ENS criado on-chain, mas o inventário local falhou. Rode o reparo manual antes do próximo deploy. Detalhe: ${inventoryMsg}`,
          'erro'
        );
        throw inventoryError;
      }

      this.addLog(`Membro "${userLabel}.${instLabel}.axolodao2.eth" registrado com sucesso!`, 'ok');

      // Limpar campos
      this.userLabel = '';
      this.userAddress = '';
      this.atualizarPreviews();
    } catch (error: any) {
      const msg = error?.reason || error?.message || String(error);
      this.updateLastLog(msg, 'erro');
    } finally {
      this.processando = false;
      this.cdr.detectChanges();
    }
  }

  private addLog(mensagem: string, status: LogEntry['status']): void {
    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.logs.push({ hora, mensagem, status });
    this.cdr.detectChanges();
  }

  private updateLastLog(mensagem: string, status: LogEntry['status']): void {
    if (this.logs.length === 0) return;
    const last = this.logs[this.logs.length - 1];
    last.mensagem = mensagem;
    last.status = status;
    this.cdr.detectChanges();
  }
}
