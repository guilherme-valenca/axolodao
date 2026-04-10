import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tanques } from './tanques';

describe('Tanques', () => {
  let component: Tanques;
  let fixture: ComponentFixture<Tanques>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tanques],
    }).compileComponents();

    fixture = TestBed.createComponent(Tanques);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
