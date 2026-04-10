import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Web3Service } from '../../services/web3';
import { RelayerService } from '../../services/relayer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-tanque',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './cadastro-tanque.html',
  styleUrls: ['./cadastro-tanque.css']
})
export class CadastroTanque implements OnInit {
  // Estado do formulário
  nomeTanque: string = '';
  localizacao: string = '';

  // Controle de estado
  enderecoResponsavel: string = '';
  enviandoTx: boolean = false;

  constructor(private web3Service: Web3Service, private relayerService: RelayerService) {}

  async ngOnInit() {
    // Inicializa o endereço da carteira para o campo de responsável
    if (this.web3Service.address) {
      this.enderecoResponsavel = this.web3Service.address;
    } else {
      await this.web3Service.checkConnection();
      this.enderecoResponsavel = this.web3Service.address;
    }
  }

  // Registra um novo tanque no Smart Contract
  async cadastrarTanque() {
    if (!this.nomeTanque || !this.localizacao) {
      Swal.fire('Atenção', 'Preencha todos os campos obrigatórios.', 'warning');
      return;
    }

    this.enviandoTx = true;

    try {
      const contract = this.web3Service.contracts.registry;
      if (!contract) {
        Swal.fire('Erro', 'Contrato de registro indisponível.', 'error');
        return;
      }

      Swal.fire({
        title: 'Registrando...',
        text: 'Assine a mensagem e aguarde a confirmação.',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await this.relayerService.relayWrite(contract, 'registerTank', [
        this.nomeTanque,
        this.localizacao,
      ]);

      Swal.fire('Sucesso!', 'Novo tanque registrado na blockchain.', 'success');

      this.nomeTanque = '';
      this.localizacao = '';

    } catch (error: any) {
      let msgErro = error.reason || error.info?.error?.message || error.message || 'Falha ao registrar tanque.';
      Swal.fire('Erro na Transação', msgErro, 'error');
    } finally {
      this.enviandoTx = false;
    }
  }
}
