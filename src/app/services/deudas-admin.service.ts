import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeudasAdmin } from '../common/deudas-admin';

@Injectable({
  providedIn: 'root'
})
export class DeudasAdminService {

  private debtsUrl = 'http://localhost:8080/api/orderOnCredits'

  constructor(private httpClient: HttpClient) { }

  getDebtsHistory(userName: string): Observable<GetResponseDebts> {
    const debtsHistoryUrl = `${this.debtsUrl}/search/findByCustomerUserName?userName=${userName}`;
    return this.httpClient.get<GetResponseDebts>(debtsHistoryUrl);
  }
}

interface GetResponseDebts {
  _embedded: {
    orderOnCredits: DeudasAdmin[];
  }
}
