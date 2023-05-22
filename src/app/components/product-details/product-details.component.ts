import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartItemOnCredit } from 'src/app/common/cart-item-on-credit';
import { Product } from 'src/app/common/product';
import { CartOnCreditService } from 'src/app/services/cart-on-credit.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product; 

  numberOfFees: number = 2;

  constructor(private ProductService: ProductService,
              private cartService: CartOnCreditService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {

    //convertir string en number usando el simbolo "+"
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.ProductService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

 /* incrementQuantity(theCartItem: CartItemOnCredit) {
    this.cartService.addToCart(theCartItem);
  }*/

  addToCart() {

    console.log(`Añadiendo compra a credito: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartitem = new CartItemOnCredit(this.product);
    this.cartService.addToCart(theCartitem);
  }

  volver(): void {
    this.router.navigate(['/products']);
  }



}
