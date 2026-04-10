import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ethers } from 'ethers';
import { Web3Service } from '../../services/web3';
import { RelayerService } from '../../services/relayer.service';
import { environment } from '../../../environments/environment';

interface ContractInfo {
  nome: string;
  endereco: string;
}

interface EasSchema {
  nome: string;
  uid: string;
}

interface RelayerStatus {
  online: boolean;
  wallet: string;
  saldo: string;
  rede: string;
}

@Component({
  selector: 'app-admin-diagnostico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-diagnostico.html',
  styleUrls: ['./admin-diagnostico.css'],
})
export class AdminDiagnostico implements OnInit {
  private web3Service = inject(Web3Service);
  private relayerService = inject(RelayerService);
  private cdr = inject(ChangeDetectorRef);

  // Constantes do contrato
  axolodaoNode = '';
  axolodaoNodeEsperado = '';
  ensRegistry = '';
  ensRegistryEsperado = environment.ensRegistry;

  // Contratos
  contratos: ContractInfo[] = [
    { nome: 'AxoloAccess', endereco: environment.contracts.access },
    { nome: 'AxoloRegistry', endereco: environment.contracts.registry },
    { nome: 'AxoloMonitoring', endereco: environment.contracts.monitoring },
  ];

  // EAS
  easAddress = '';
  easSchemas: EasSchema[] = [];

  // Relayer
  relayerStatus: RelayerStatus = { online: false, wallet: '', saldo: '', rede: '' };

  carregando = true;

  async ngOnInit(): Promise<void> {
    await this.carregarDiagnostico();
  }

  async carregarDiagnostico(): Promise<void> {
    this.carregando = true;
    this.cdr.detectChanges();

    try {
      await Promise.all([
        this.carregarConstantes(),
        this.carregarEas(),
        this.carregarRelayer(),
      ]);
    } catch (error) {
      console.error('Erro no diagnóstico:', error);
    } finally {
      this.carregando = false;
      this.cdr.detectChanges();
    }
  }

  private async carregarConstantes(): Promise<void> {
    const contract = this.web3Service.contracts.access;
    if (!contract) return;

    this.axolodaoNodeEsperado = ethers.namehash('axolodao2.eth');

    const [node, registry] = await Promise.all([
      contract['AXOLODAO_NODE'](),
      contract['ENS_REGISTRY'](),
    ]);

    this.axolodaoNode = node;
    this.ensRegistry = registry;
  }

  private async carregarEas(): Promise<void> {
    const regContract = this.web3Service.contracts.registry;
    const monContract = this.web3Service.contracts.monitoring;
    if (!regContract || !monContract) return;

    const [easAddr, tankSchema, axolotlSchema, transferSchema, deactivateSchema, measurementSchema] =
      await Promise.all([
        regContract['eas'](),
        regContract['tankSchemaUID'](),
        regContract['axolotlSchemaUID'](),
        regContract['transferSchemaUID'](),
        regContract['deactivateSchemaUID'](),
        monContract['measurementSchemaUID'](),
      ]);

    this.easAddress = easAddr;
    this.easSchemas = [
      { nome: 'Tank', uid: tankSchema },
      { nome: 'Axolotl', uid: axolotlSchema },
      { nome: 'Transfer', uid: transferSchema },
      { nome: 'Deactivate', uid: deactivateSchema },
      { nome: 'Measurement', uid: measurementSchema },
    ];
  }

  private async carregarRelayer(): Promise<void> {
    const online = await this.relayerService.checkHealth();
    this.relayerStatus.online = online;

    if (!online) return;

    try {
      const res = await fetch(`${environment.relayerUrl}/health`);
      const data = await res.json();
      this.relayerStatus.wallet = data.wallet || '';
      this.relayerStatus.saldo = data.balance || '';
      this.relayerStatus.rede = data.network || `Chain ${environment.chainId}`;
    } catch {
      // health check already set online status
    }
  }

  get nodeConfere(): boolean {
    return this.axolodaoNode === this.axolodaoNodeEsperado;
  }

  get ensConfere(): boolean {
    return this.ensRegistry.toLowerCase() === this.ensRegistryEsperado.toLowerCase();
  }

  encurtar(addr: string): string {
    if (!addr || addr.length < 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  etherscanUrl(addr: string): string {
    return `https://sepolia.etherscan.io/address/${addr}`;
  }

  easscanUrl(uid: string): string {
    return `https://sepolia.easscan.org/schema/view/${uid}`;
  }
}
