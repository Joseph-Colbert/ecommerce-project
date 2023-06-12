import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOnCreditComponent } from './payment-on-credit.component';

describe('PaymentOnCreditComponent', () => {
  let component: PaymentOnCreditComponent;
  let fixture: ComponentFixture<PaymentOnCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentOnCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentOnCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
