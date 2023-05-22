import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderItemOnCredit } from 'src/app/common/order-item-on-credit';
import { OrderOnCredit } from 'src/app/common/order-on-credit';
import { Product } from 'src/app/common/product';
import { PurchaseOnCredit } from 'src/app/common/purchase-on-credit';
import { CartOnCreditService } from 'src/app/services/cart-on-credit.service';
import { CheckoutOnCreditService } from 'src/app/services/checkout-on-credit.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout-on-credit',
  templateUrl: './checkout-on-credit.component.html',
  styleUrls: ['./checkout-on-credit.component.css']
})
export class CheckoutOnCreditComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  product!: Product; 

  totalQuantity: number = 1;
  totalPriceOnCredit: number = 0;
  payment: number = 0;

  monthlyFeesToPay: number = 0;
  monthlyFeesPaid: number = 0;
  

  constructor(private formBuilder: FormBuilder,
    private cartService: CartOnCreditService,
    private checkoutService: CheckoutOnCreditService,
    private router: Router) { }

    ngOnInit(): void {

      this.checkoutFormGroup! = this.formBuilder.group({
  
        customer: this.formBuilder.group({
          firstName: new FormControl('',
                                    [Validators.required, 
                                     Validators.minLength(2), 
                                     ShopValidators.notOnlyWhitespace]),
          lastName: new FormControl('',
                                    [Validators.required, 
                                     Validators.minLength(2), 
                                     ShopValidators.notOnlyWhitespace]),
          email: new FormControl('',
                                [Validators.required, 
                                 Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
        }),
  
        shippingAddress: this.formBuilder.group({
          street: new FormControl('',
                                [Validators.required, 
                                 Validators.minLength(2), 
                                 ShopValidators.notOnlyWhitespace]),
  
          city: new FormControl('',
                               [Validators.required, 
                                Validators.minLength(2), 
                                ShopValidators.notOnlyWhitespace]),
  
          zipCode: new FormControl('',
                                  [Validators.required, 
                                   Validators.minLength(2), 
                                   ShopValidators.notOnlyWhitespace])
          }),
      });

    }

    reviewCartDetails() {

    // ingresar en cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // ingresar cartService.totalPrice
    this.cartService.totalPriceOnCredit.subscribe(
      totalPriceOnCredit => this.totalPriceOnCredit = totalPriceOnCredit
    );
  }

    
  get firstName() { return this.checkoutFormGroup.get('customer.firstName')!; }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName')!; }
  get email() { return this.checkoutFormGroup.get('customer.email')!; }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street')!; }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city')!; }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode')!; }


  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched;
      return
    }

    // configurar orden
    let order = new OrderOnCredit();
    order.totalPriceOnCredit = this.totalPriceOnCredit;
    order.totalQauntity = this.totalQuantity;
    order.monthlyFeesToPay = this.monthlyFeesToPay

    // obtener items 
    const cartItems = this.cartService.cartItems;

    // crear orderItems de cartItems
    let orderItemsOnCredit: OrderItemOnCredit[] = cartItems.map(tempCartItem => new OrderItemOnCredit(tempCartItem));

    // configurar compras
    let purchase = new PurchaseOnCredit();

    // completar compra - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
 
    // completar compra - order y orderItem
    purchase.orderOnCredit = order;
    purchase.orderItems = orderItemsOnCredit;

  }

  volver(): void {
    this.router.navigate(['/products/:id']);
  }
  

}


