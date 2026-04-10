import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Axolotes } from './axolotes';

describe('Axolotes', () => {
  let component: Axolotes;
  let fixture: ComponentFixture<Axolotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Axolotes],
    }).compileComponents();

    fixture = TestBed.createComponent(Axolotes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
