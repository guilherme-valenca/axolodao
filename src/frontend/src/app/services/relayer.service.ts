import { Injectable, OnDestroy } from '@angular/core';
import { ethers } from 'ethers';
import { environment } from '../../environments/environment';
import { Web3Service } from './web3';

@Injectable({ providedIn: 'root' })
export class RelayerService implements OnDestroy {
  private relayerUrl = environment.relayerUrl;
  private intervalId: ReturnType<typeof setInterval>;
  public online = false;

  constructor(private web3: Web3Service) {
    this._initialCheck();
    this.intervalId = setInterval(() => this.checkHealth(), 30_000);
  }

  /** Tenta até 3x com intervalo de 2s na primeira checagem (evita falso "offline" no reload). */
  private async _initialCheck(): Promise<void> {
    for (let i = 0; i < 3; i++) {
      if (await this.checkHealth()) return;
      await new Promise(r => setTimeout(r, 2_000));
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${this.relayerUrl}/health`);
      const newStatus = res.ok;
      if (this.online !== newStatus) this.online = newStatus;
    } catch {
      if (this.online) this.online = false;
    }
    return this.online;
  }

  /**
   * Envia transação gasless via relayer ERC2771.
   * 1. Encoda calldata com a interface do contrato
   * 2. Pede assinatura ao MetaMask (personal_sign)
   * 3. POST /relay com { target, data, user, signature }
   * 4. Retorna txHash após confirmação on-chain
   */
  async relayWrite(contract: ethers.Contract, method: string, args: any[]): Promise<string> {
    if (!this.online) throw new Error('Relayer offline. Execute: node server.js no diretório axolodao-relayer/');
    if (!this.web3.signer) throw new Error('Carteira não conectada');

    const data      = contract.interface.encodeFunctionData(method, args);
    const target    = await contract.getAddress();
    const user      = await this.web3.signer.getAddress();
    const signature = await this.web3.signer.signMessage(ethers.getBytes(data));

    const res = await fetch(`${this.relayerUrl}/relay`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ target, data, user, signature }),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || `Relay error ${res.status}`);
    return json.txHash as string;
  }

  async registerEnsMemberInventory(payload: {
    instLabel: string;
    userLabel: string;
    userAddress: string;
    resolverAddress: string;
  }): Promise<void> {
    if (!this.online) throw new Error('Relayer offline. Não foi possível registrar o inventário ENS.');

    const res = await fetch(`${this.relayerUrl}/ens-inventory/member`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || `ENS inventory error ${res.status}`);
  }
}
