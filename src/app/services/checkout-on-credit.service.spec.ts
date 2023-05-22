import { TestBed } from '@angular/core/testing';

import { CheckoutOnCreditService } from './checkout-on-credit.service';

describe('CheckoutOnCreditService', () => {
  let service: CheckoutOnCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutOnCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
