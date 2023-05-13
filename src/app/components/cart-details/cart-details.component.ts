import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService, 
              private router: Router) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    
    // obtener acceso a los productos del carrito
    this.cartItems = this.cartService.cartItems;

    // utilizar subscribe para el precio total del carrito de compras
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // utilizar subscribe para la cantidad total del carrito de compras
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    // calcular el total del precio y el total de la cantidad en el carrito
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem)
  }

  volver(): void {
    this.router.navigate(['/products']);
  }

}
