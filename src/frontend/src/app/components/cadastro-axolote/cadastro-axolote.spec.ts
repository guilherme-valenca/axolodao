import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAxolote } from './cadastro-axolote';

describe('CadastroAxolote', () => {
  let component: CadastroAxolote;
  let fixture: ComponentFixture<CadastroAxolote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAxolote],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroAxolote);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
