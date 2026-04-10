import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * ApiService — Acessa o indexador Supabase/Vercel para leituras rápidas.
 *
 * Todos os métodos retornam dados já mapeados para camelCase,
 * compatíveis com as interfaces do frontend.
 * Se o indexador estiver offline ou desabilitado, os componentes
 * devem fazer fallback para leitura direta da blockchain.
 *
 * Endpoints baseados em: arquivos_planejamento/branch_indexador/backend/api/
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;
  public enabled = environment.useIndexer;
  public online = false;

  constructor() {
    if (this.enabled) {
      this._initialCheck();
    }
  }

  // ── Health Check ──────────────────────────────────────────────

  private async _initialCheck(): Promise<void> {
    for (let i = 0; i < 3; i++) {
      if (await this.checkHealth()) return;
      await new Promise(r => setTimeout(r, 2_000));
    }
  }

  async checkHealth(): Promise<boolean> {
    if (!this.enabled) return false;
    try {
      const res = await fetch(`${this.baseUrl}/api/caretaker/tank`, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5_000),
      });
      this.online = res.ok;
    } catch {
      this.online = false;
    }
    return this.online;
  }

  /** Retorna true se o indexador está habilitado E online */
  get available(): boolean {
    return this.enabled && this.online;
  }

  // ── Tanques ───────────────────────────────────────────────────

  /**
   * Lista todos os tanques.
   * GET /api/caretaker/tank?active=true|false
   * Retorna: { source, count, tanks[] }
   */
  async getTanks(filters?: { active?: boolean }): Promise<any[]> {
    let url = `${this.baseUrl}/api/caretaker/tank`;
    if (filters?.active !== undefined) {
      url += `?active=${filters.active}`;
    }
    const res = await this._fetch(url);
    const data = await res.json();
    return (data.tanks || []).map((t: any) => this._mapTank(t));
  }

  /**
   * Tanque por ID.
   * GET /api/caretaker/tank/:id
   */
  async getTankById(id: number): Promise<any> {
    const res = await this._fetch(`${this.baseUrl}/api/caretaker/tank/${id}`);
    const data = await res.json();
    return data.tank ? this._mapTank(data.tank) : null;
  }

  // ── Axolotes ──────────────────────────────────────────────────

  /**
   * Lista axolotes. Filtros opcionais: tank_id, active.
   * GET /api/caretaker/axolotl?tank_id=X&active=true
   */
  async getAxolotls(filters?: { tankId?: number; active?: boolean }): Promise<any[]> {
    const params = new URLSearchParams();
    if (filters?.tankId !== undefined) params.set('tank_id', String(filters.tankId));
    if (filters?.active !== undefined) params.set('active', String(filters.active));
    const qs = params.toString();
    const url = `${this.baseUrl}/api/caretaker/axolotl${qs ? '?' + qs : ''}`;
    const res = await this._fetch(url);
    const data = await res.json();
    return (data.axolotls || []).map((a: any) => this._mapAxolotl(a));
  }

  /**
   * Axolote por ID (inclui medições recentes do tanque).
   * GET /api/caretaker/axolotl/:id
   */
  async getAxolotlById(id: number): Promise<{ axolotl: any; recentMeasurements: any[] }> {
    const res = await this._fetch(`${this.baseUrl}/api/caretaker/axolotl/${id}`);
    const data = await res.json();
    return {
      axolotl: data.axolotl ? this._mapAxolotl(data.axolotl) : null,
      recentMeasurements: (data.recentMeasurements || []).map((m: any) => this._mapMeasurement(m)),
    };
  }

  // ── Medições ──────────────────────────────────────────────────

  /**
   * Medições por tanque.
   * GET /api/caretaker/measurement?tank_id=X&limit=N
   */
  async getMeasurementsByTank(tankId: number, limit = 20): Promise<any[]> {
    const res = await this._fetch(
      `${this.baseUrl}/api/caretaker/measurement?tank_id=${tankId}&limit=${limit}`
    );
    const data = await res.json();
    return (data.measurements || []).map((m: any) => this._mapMeasurement(m));
  }

  /**
   * Medição por ID.
   * GET /api/auditor/measurement/:id (inclui fallback onchain no backend)
   */
  async getMeasurementById(id: number): Promise<any> {
    const res = await this._fetch(`${this.baseUrl}/api/auditor/measurement/${id}`);
    const data = await res.json();
    return data.measurement ? this._mapMeasurement(data.measurement) : null;
  }

  /**
   * Medições pendentes (para auditor).
   * GET /api/auditor/measurement?status=pending
   */
  async getPendingMeasurements(): Promise<any[]> {
    const res = await this._fetch(`${this.baseUrl}/api/auditor/measurement?status=pending`);
    const data = await res.json();
    return (data.measurements || []).map((m: any) => this._mapMeasurement(m));
  }

  /**
   * Medições com filtro de status.
   * GET /api/auditor/measurement?status=validated|contested|pending&tank_id=X
   */
  async getMeasurements(filters?: { status?: string; tankId?: number }): Promise<any[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.set('status', filters.status);
    if (filters?.tankId !== undefined) params.set('tank_id', String(filters.tankId));
    const qs = params.toString();
    const url = `${this.baseUrl}/api/auditor/measurement${qs ? '?' + qs : ''}`;
    const res = await this._fetch(url);
    const data = await res.json();
    return (data.measurements || []).map((m: any) => this._mapMeasurement(m));
  }

  // ── Fetch Wrapper ─────────────────────────────────────────────

  private async _fetch(url: string): Promise<Response> {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      throw new Error(`API ${res.status}: ${res.statusText}`);
    }
    return res;
  }

  // ── Mappers (snake_case → camelCase) ──────────────────────────

  /** Mapeia tank do Supabase para formato do frontend */
  private _mapTank(t: any): any {
    return {
      id: t.onchain_id ?? t.id,
      name: t.name,
      location: t.location,
      registeredBy: t.registered_by ?? t.registeredBy ?? '',
      registeredAt: t.registered_at ? new Date(t.registered_at) : (t.registeredAt ? new Date(Number(t.registeredAt) * 1000) : new Date()),
      active: t.active ?? true,
      txHash: t.tx_hash ?? '',
      // attestationUID não está no Supabase — será vazio
      attestationUID: t.attestation_uid ?? t.attestationUID ?? '',
    };
  }

  /** Mapeia axolotl do Supabase para formato do frontend */
  private _mapAxolotl(a: any): any {
    return {
      id: a.onchain_id ?? a.id,
      name: a.name,
      species: a.species ?? '',
      birthDate: a.birth_date ?? a.birthDate ?? 0,
      tankId: a.tank_id ?? a.tankId,
      morphData: a.morph_data ?? a.morphData ?? '',
      photoHash: a.photo_hash ?? a.photoHash ?? '',
      registeredBy: a.registered_by ?? a.registeredBy ?? '',
      registeredAt: a.registered_at ? new Date(a.registered_at) : new Date(),
      active: a.active ?? true,
      txHash: a.tx_hash ?? '',
      attestationUID: a.attestation_uid ?? a.attestationUID ?? '',
    };
  }

  /** Mapeia measurement do Supabase para formato do frontend */
  private _mapMeasurement(m: any): any {
    // O Supabase guarda status como string enum ('pending','validated','contested')
    // O frontend espera status como number (0, 1, 2)
    const statusMap: Record<string, number> = { pending: 0, validated: 1, contested: 2 };
    const statusNum = typeof m.status === 'string' ? (statusMap[m.status] ?? 0) : Number(m.status);

    return {
      id: m.onchain_id ?? m.id,
      tankId: m.tank_id ?? m.tankId,
      recorder: m.recorder ?? '',
      timestamp: m.timestamp ? Math.floor(new Date(m.timestamp).getTime() / 1000) : Number(m.timestamp ?? 0),
      temperature: m.temperature,
      ph: m.ph,
      dissolvedOxygen: m.dissolved_oxygen ?? m.dissolvedOxygen ?? 0,
      conductivity: m.conductivity ?? 0,
      turbidity: m.turbidity ?? 0,
      phosphates: m.phosphates ?? 0,
      no2: m.no2 ?? 0,
      no3: m.no3 ?? 0,
      ammonia: m.ammonia ?? 0,
      hardness: m.hardness ?? 0,
      status: statusNum,
      validator: m.validator ?? '',
      validatedAt: m.validated_at ?? m.validatedAt ?? 0,
      contestReason: m.contest_reason ?? m.contestReason ?? '',
      attestationUID: m.attestation_uid ?? m.attestationUID ?? '',
      txHash: m.tx_hash ?? '',
    };
  }
}
