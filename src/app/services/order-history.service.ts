import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = 'http://localhost:8080/api/orders'
  constructor(private httpClient: HttpClient) { }

  getOrderHistory(userName: string): Observable<GetResponseOrderHistory> {
    
    // construir la URL basados en el email del cliente
    const orderHistoryUrl = `${this.orderUrl}/search/findByCustomerUserName?userName=${userName}`;
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }
}

interface GetResponseOrderHistory {
  _embedded: {
    orders: OrderHistory[];
  }
}