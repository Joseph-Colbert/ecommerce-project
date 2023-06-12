import { TestBed } from '@angular/core/testing';

import { PaymentOnCreditService } from './payment-on-credit.service';

describe('PaymentOnCreditService', () => {
  let service: PaymentOnCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentOnCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
