import { Injectable } from '@angular/core';
import { CartItemOnCredit } from '../common/cart-item-on-credit';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductDetailComponent } from '../product-admin/product-detail/product-detail.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';

@Injectable({
  providedIn: 'root'
})
export class CartOnCreditService {

  cartItems: CartItemOnCredit[] = [];

  numberOfFees: ProductDetailsComponent[] = [];

  //subject para publicar eventos en el codigo
  totalPriceOnCredit: Subject<number> = new BehaviorSubject<number>(0);
  totalPriceOnCredit$ = this.totalPriceOnCredit.asObservable();

  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity$ = this.totalQuantity.asObservable();

  payment: Subject<number> = new BehaviorSubject<number>(0);
  payment$ = this.payment.asObservable();

  monthlyFeesToPay: Subject<number> = new BehaviorSubject<number>(0);
  monthlyFeesToPay$ = this.monthlyFeesToPay.asObservable();

  monthlyFeesPaid: Subject<number> = new BehaviorSubject<number>(0);
  monthlyFeesPaid$ = this.monthlyFeesPaid.asObservable();

  unitPrice: Subject<number> = new BehaviorSubject<number>(0);
  unitPrice$ = this.unitPrice.asObservable();

  constructor() { }

  addToCart(theCartItem: CartItemOnCredit, numberOfFees: number) {

     // revisar si tenemos el item en el carrito
     let alreadyExistsInCart: boolean = false;
     let existingCartItem: CartItemOnCredit = undefined!;
 
     if (this.cartItems.length > 0) {
       // encontrar el item en el carrito nasado en el id del item
 
       existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;
 
       // revisar si lo encontramos
       alreadyExistsInCart = (existingCartItem != undefined);
     }
 
     if (alreadyExistsInCart) {
       //incrementar la cantidad 
       existingCartItem.quantity++;
     } else {
       // solo añade el item al array
       this.cartItems.push(theCartItem); 
     }
 
    this.computeCartTotals(theCartItem,numberOfFees);

  }

  computeCartTotals(theCartItem: CartItemOnCredit, numberOfFees: number) {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    let totalmonthlyFeesToPay: number = 0;
    let payment: number = ((theCartItem.unitPrice * 0.07) + theCartItem.unitPrice) / numberOfFees;
    let totalmonthlyFeespaid: number = 0;
    let unitPrice: number =(theCartItem.unitPrice * 0.07) + theCartItem.unitPrice;

    // publicar los nuevos valores // next enviara el evento
    this.totalQuantity.next(1);
    this.monthlyFeesToPay.next(numberOfFees);
    this.monthlyFeesPaid.next(totalmonthlyFeespaid);
    this.payment.next(payment);
    this.totalPriceOnCredit.next(theCartItem.unitPrice);
    this.unitPrice.next(unitPrice);

  

    // for debugging
    this.logCartData(totalPriceValue, totalQuantityValue, totalmonthlyFeesToPay);

  }

  logCartData(totalPriceValue: number, totalQuantityValue: number, totalmonthlyFeesToPay: number) {
    
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const quantityValue = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity= ${tempCartItem.quantity}`)
    }

    for (let tempCartItem of this.cartItems) {
      const numberOfFeesValue = tempCartItem.numberOfFees;
      console.log(`numero de pagos= ${tempCartItem.numberOfFees}`)
    }

    // toFixed, para que muestre dos decimales 
    //console.log(`totalPrice: ${totalPriceValue.toFixed(2)},totalQuantityL ${totalQuantityValue}`);
  }

}
