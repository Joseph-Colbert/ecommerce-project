import { TestBed } from '@angular/core/testing';

import { DeudasAdminService } from './deudas-admin.service';

describe('DeudasAdminService', () => {
  let service: DeudasAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeudasAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
