import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutOnCreditComponent } from './checkout-on-credit.component';

describe('CheckoutOnCreditComponent', () => {
  let component: CheckoutOnCreditComponent;
  let fixture: ComponentFixture<CheckoutOnCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutOnCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutOnCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
