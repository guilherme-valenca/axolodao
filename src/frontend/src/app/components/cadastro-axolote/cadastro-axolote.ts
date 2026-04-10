import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import { ActiveTank, Web3Service } from '../../services/web3';
import { RelayerService } from '../../services/relayer.service';

@Component({
  selector: 'app-cadastro-axolote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-axolote.html',
  styleUrls: ['./cadastro-axolote.css'],
})
export class CadastroAxolote implements OnInit {
  @Output() axoloteCadastrado = new EventEmitter<void>();

  // Estado do formulario
  nome = '';
  especie = '';
  dataNascimento = '';
  tanqueId: number | null = null;
  morfologia = '';
  photoHashInput = '';

  readonly especiesDisponiveis = [
    { valor: 'A. andersoni', label: 'A. andersoni' },
    { valor: 'A. mexicanum', label: 'A. mexicanum' },
    { valor: 'A. dumerilii', label: 'A. dumerilii' },
  ];
  readonly morfologiasDisponiveis = [
    { valor: 'Silvestre', label: 'Silvestre' },
    { valor: 'Leucístico', label: 'Leucístico' },
    { valor: 'Melanoide', label: 'Melanoide' },
    { valor: 'Albino dourado', label: 'Albino dourado' },
    { valor: 'Jaspeado escuro', label: 'Jaspeado escuro' },
    { valor: 'Verde oliva / pardo', label: 'Verde oliva / pardo' },
  ];

  // Tanques ativos para select
  tanquesAtivos: ActiveTank[] = [];

  // Controle de estado
  enderecoResponsavel = '';
  enviandoTx = false;

  constructor(private web3Service: Web3Service, private relayerService: RelayerService) {}

  async ngOnInit() {
    if (!this.web3Service.address) {
      await this.web3Service.checkConnection();
    }
    this.enderecoResponsavel = this.web3Service.address;
    this.tanquesAtivos = await this.web3Service.buscarTanquesAtivos();
  }

  async cadastrarAxolote() {
    if (!this.nome || !this.especie || !this.dataNascimento || !this.tanqueId || !this.morfologia) {
      Swal.fire('Atenção', 'Preencha todos os campos do axolote!', 'warning');
      return;
    }

    this.enviandoTx = true;

    try {
      const contract = this.web3Service.contracts.registry;
      if (!contract) {
        Swal.fire('Erro', 'Contrato de registro indisponível.', 'error');
        return;
      }

      const dataObj = new Date(this.dataNascimento);
      const timestampNascimento = Math.floor(dataObj.getTime() / 1000);

      let photoHash: string;
      if (this.photoHashInput.trim()) {
        try {
          photoHash = ethers.zeroPadValue(this.photoHashInput.trim(), 32);
        } catch {
          Swal.fire('Hash inválido', 'O hash informado não é um valor hexadecimal válido de até 32 bytes.', 'warning');
          return;
        }
      } else {
        photoHash = ethers.zeroPadValue('0x01', 32);
      }

      Swal.fire({
        title: 'Registrando...',
        text: 'Assine a mensagem e aguarde a confirmação.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await this.relayerService.relayWrite(contract, 'registerAxolotl', [
        this.nome,
        this.especie,
        Number(timestampNascimento),
        Number(this.tanqueId),
        this.morfologia,
        photoHash,
      ]);

      Swal.fire('Sucesso!', 'Axolote registrado no sistema!', 'success');
      this.limparFormulario();
      this.axoloteCadastrado.emit();
    } catch (error: any) {
      const msgErro = error.reason || error.info?.error?.message || error.message || 'Falha ao registrar na blockchain.';
      Swal.fire('Erro', msgErro, 'error');
    } finally {
      this.enviandoTx = false;
    }
  }

  limparFormulario(): void {
    this.nome = '';
    this.especie = '';
    this.dataNascimento = '';
    this.tanqueId = null;
    this.morfologia = '';
    this.photoHashInput = '';
  }
}
