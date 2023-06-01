import { Injectable } from '@angular/core';
import { PurchaseOnCredit } from '../common/purchase-on-credit';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutOnCreditService {

  private purchaseUrl = 'http://localhost:8080/api/checkout/purchaseoncredit';
  
  private paymentIntentUrl = 'http://localhost:8080/api/checkout/payment-intent-on-credit';


  constructor(private httpClient: HttpClient) { }

  placeOrderOnCredit(purchase: PurchaseOnCredit): Observable<any> {
    return this.httpClient.post<PurchaseOnCredit>(this.purchaseUrl, purchase);
  }

  createPaymentIntentOnCredit(paymentInfo: PaymentInfo): Observable<any> {
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }


}
