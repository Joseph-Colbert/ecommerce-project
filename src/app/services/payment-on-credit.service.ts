import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentOnCredit } from '../common/payment-on-credit';
import { Observable } from 'rxjs';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class PaymentOnCreditService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchaseoncreditpayment';
  
  private paymentIntentUrl = 'http://localhost:8080/api/checkout/new-payment-intent-on-credit';


  constructor(private httpClient: HttpClient) { }

  placeOrderOnCredit(purchase: PaymentOnCredit): Observable<any> {
    return this.httpClient.post<PaymentOnCredit>(this.purchaseUrl, purchase);
  }

  createPaymentIntentOnCredit(paymentInfo: PaymentInfo): Observable<any> {
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }

}
