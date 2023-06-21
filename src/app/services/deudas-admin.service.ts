import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeudasAdmin } from '../common/deudas-admin';

@Injectable({
  providedIn: 'root'
})
export class DeudasAdminService {

  private debtsUrl = 'http://localhost:8080/api/orderOnCredits'

  private debtsUrlOrder = 'http://localhost:8080/api/orderItemOnCredits'

  constructor(private httpClient: HttpClient) { }

  getDebtsHistory(userName: string): Observable<GetResponseDebts> {
    const debtsHistoryUrl = `${this.debtsUrl}/search/findByCustomerUserName?userName=${userName}`;
    return this.httpClient.get<GetResponseDebts>(debtsHistoryUrl);
  }
  getDebtsHistoryOrders(orderTrackingNumber: string): Observable<any> {
    const debtsHistoryUrl = `${this.debtsUrlOrder}/search/findAllByOrderOnCreditOrderTrackingNumber?orderTrackingNumber=${orderTrackingNumber}`;
    return this.httpClient.get<any>(debtsHistoryUrl);
  }
}

interface GetResponseDebts {
  _embedded: {
    orderOnCredits: DeudasAdmin[];
  }
}
