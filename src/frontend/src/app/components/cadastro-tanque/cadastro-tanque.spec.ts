import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTanque } from './cadastro-tanque';

describe('CadastroTanque', () => {
  let component: CadastroTanque;
  let fixture: ComponentFixture<CadastroTanque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroTanque],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroTanque);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
