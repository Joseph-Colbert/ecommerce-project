import { Injectable } from '@angular/core';
import { CartItemOnCreditPayment } from '../common/cart-item-on-credit-payment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartPaymentOnCreditService {

  cartItems: CartItemOnCreditPayment[] = [];

  orderTrackingNumber: Subject<string> = new BehaviorSubject<string>('');
  orderTrackingNumber$ = this.orderTrackingNumber.asObservable();

  constructor() { }

  computeCartTotals(theCartItem: CartItemOnCreditPayment) {
    let orderTrackingNumber1: string = '';

       // publicar los nuevos valores // next enviara el evento
       this.orderTrackingNumber.next(orderTrackingNumber1);
  }


}
