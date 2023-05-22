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
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  payment: Subject<number> = new BehaviorSubject<number>(0);
  monthlyFeesToPay: Subject<number> = new BehaviorSubject<number>(0);
  monthlyFeesPaid: Subject<number> = new BehaviorSubject<number>(0);


  constructor() { }

  addToCart(theCartItem: CartItemOnCredit) {

    // revisar si tenemos el item en el carrito
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItemOnCredit = undefined!;

    if (this.cartItems.length > 0) {
      // encontrar el item en el carrito basado en el id del item

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

    // calcular el precio total del carrito y la cantidad total
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    let totalmonthlyFeesToPay: number = 0;
    
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    for (let currentFees of this.numberOfFees) {
       totalmonthlyFeesToPay += currentFees.numberOfFees;
     }

    // publicar los nuevos valores // next enviara el evento
    this.totalPriceOnCredit.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.monthlyFeesToPay.next(totalmonthlyFeesToPay)

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
