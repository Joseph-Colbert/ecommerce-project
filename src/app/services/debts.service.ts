import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Debts } from '../common/debts';

@Injectable({
  providedIn: 'root'
})
export class DebtsService {

  private debtsUrl = 'http://localhost:8080/api/orderOnCredits'

  constructor(private httpClient: HttpClient) { }

  getDebtsHistory(userName: string): Observable<GetResponseDebts> {
    const debtsHistoryUrl = `${this.debtsUrl}/search/findByCustomerUserName?userName=${userName}`;
    return this.httpClient.get<GetResponseDebts>(debtsHistoryUrl);
  }
}

interface GetResponseDebts {
  _embedded: {
    orderOnCredits: Debts[];
  }
}
