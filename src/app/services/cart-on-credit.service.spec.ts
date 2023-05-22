import { TestBed } from '@angular/core/testing';

import { CartOnCreditService } from './cart-on-credit.service';

describe('CartOnCreditService', () => {
  let service: CartOnCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartOnCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
