import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  //subject para publicar eventos en el codigo
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    // revisar si tenemos el item en el carrito
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      // encontrar el item en el carrito nasado en el id del item

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id)!;

      // revisar si lo encontramos
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      //incrementar la cantidad 
      existingCartItem.quatity++;
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
    
    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quatity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quatity;
    }

    // publicar los nuevos valores // next enviara el evento
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // for debugging
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quatity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity= ${tempCartItem.quatity}, unitPrices= ${tempCartItem.unitPrice}, subTotalPrice= ${subTotalPrice}`)
    }

    // toFixed, para que muestre dos decimales 
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)},totalQuantityL ${totalQuantityValue}`);
    console.log('----');
  }
}
