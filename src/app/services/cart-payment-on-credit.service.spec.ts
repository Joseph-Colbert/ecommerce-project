import { TestBed } from '@angular/core/testing';

import { CartItemPaymentOnCreditService } from './cart-item-payment-on-credit.service';

describe('CartItemPaymentOnCreditService', () => {
  let service: CartItemPaymentOnCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartItemPaymentOnCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
