import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderItemOnCredit } from 'src/app/common/order-item-on-credit';
import { OrderOnCredit } from 'src/app/common/order-on-credit';
import { PaymentInfo } from 'src/app/common/payment-info';
import { Product } from 'src/app/common/product';
import { PurchaseOnCredit } from 'src/app/common/purchase-on-credit';
import { CartOnCreditService } from 'src/app/services/cart-on-credit.service';
import { CheckoutOnCreditService } from 'src/app/services/checkout-on-credit.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout-on-credit',
  templateUrl: './checkout-on-credit.component.html',
  styleUrls: ['./checkout-on-credit.component.css']
})
export class CheckoutOnCreditComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  product!: Product; 

  totalQuantity!: number;
  totalPriceOnCredit!: number;
  payment!: number;
  unitPrice!: number;

  monthlyFeesToPay!: number;
  monthlyFeesPaid!: number;
  
  storage: Storage = sessionStorage;

  // inicializar la api de stripe
  stripe = Stripe(environment.stripePublishableKey);

    paymentInfo: PaymentInfo = new PaymentInfo();
    cardElement: any;
    displayError: any = "";

  constructor(private formBuilder: FormBuilder,
    private cartService: CartOnCreditService,
    private checkoutService: CheckoutOnCreditService,
    private router: Router) { }

    ngOnInit(): void {

      // configuracion de formulario de pagos de stripe
      this.setupStripePaymentForm();

      this.reviewCartDetails();

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

    setupStripePaymentForm() {
    
      // conseguir un encabezado a los elementos de stripe
      var elements = this.stripe.elements();
  
      // crear el elemento card... y ocultar el campo zip-code
      this.cardElement = elements.create('card', { hidePostalCode: true});
  
      // añadir a la instancia card el componente UI en el 'card-element' div
      this.cardElement.mount('#card-element');
  
      // añadir el evento binding para el 'change' en el elemento card 
      this.cardElement.on('change', (event: any) => {
  
        // obtener un identificador para el elemento card-errors
        this.displayError = document.getElementById('card-errors');
  
        if (event.complete) {
          this.displayError.textContent = "";
        } else if (event.error) {
          //mostrar la validacion de error al cliente
          this.displayError.textContent = event.error.message;
        }
      });
  
    }
  

    reviewCartDetails() {

    // ingresar en cartService.totalQuantity
    this.cartService.totalQuantity$.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // ingresar cartService.payment
    this.cartService.monthlyFeesToPay$.subscribe(
      monthlyFeesToPay => this.monthlyFeesToPay = monthlyFeesToPay
    );

    // ingresar cartService.payment
    this.cartService.monthlyFeesPaid$.subscribe(
      monthlyFeesPaid => this.monthlyFeesPaid = monthlyFeesPaid
    );

    // ingresar cartService.payment
    this.cartService.payment$.subscribe(
      payment => this.payment = payment
    );

    // ingresar cartService.totalPrice
    this.cartService.unitPrice$.subscribe(
      unitPrice => this.unitPrice = unitPrice
    );

    // ingresar cartService.totalPriceOnCredit
    this.cartService.totalPriceOnCredit$.subscribe(
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
    order.totalQauntity = this.totalQuantity;
    order.monthlyFeesToPay = this.monthlyFeesToPay;
    order.monthlyFeesPaid = this.monthlyFeesPaid;
    order.payment = this.payment;
    order.unitPrice = this.unitPrice;
    order.totalPriceOnCredit = this.totalPriceOnCredit;
    
    

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
    purchase.orderItemsOnCredit= orderItemsOnCredit;

    // si el formulario es valido entonces
    // crear el intento de pago
    // confirmar el pago con la tarjeta
    // realizar pedido

    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {

      this.checkoutService.createPaymentIntentOnCredit(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement
              }
            }, { handleActions: false })
            .then((result: any) => {
              if (result.error) {
                // informar al cliente que hubo un error 
                alert(`Hubo un error: ${result.error.message}`);
              } else {
                // llamar a la API REST via CheckoutService
                this.checkoutService.placeOrderOnCredit(purchase).subscribe({
                  next: (response: any) => {
                    alert(`Su orden fue recibida.\n Tracking number: ${response.orderTrackingNumber}`);

                  },
                  error: (err: any) => {
                    alert(`Hubo un error: ${err.message}`);
                  }
                })
              }
            });
          }
        );
    } else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
  }

  volver(): void {
    this.router.navigate(['/products/:id']);
  }
  

}


