import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentInfo } from 'src/app/common/payment-info';
import { CartPaymentOnCreditService } from 'src/app/services/cart-payment-on-credit.service';
import { CustomersService } from 'src/app/services/customers.service';
import { PaymentOnCreditService } from 'src/app/services/payment-on-credit.service';
import { TokenService } from 'src/app/services/token.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-on-credit',
  templateUrl: './payment-on-credit.component.html',
  styleUrls: ['./payment-on-credit.component.css']
})
export class PaymentOnCreditComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  user: any;
  orderTrackingNumber!: string;

  storage: Storage = sessionStorage;

  // inicializar la api de stripe
  stripe = Stripe(environment.stripePublishableKey);

    paymentInfo: PaymentInfo = new PaymentInfo();
    cardElement: any;
    displayError: any = "";

    isDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private cartService: CartPaymentOnCreditService,
              private checkoutServiceOnCredit: PaymentOnCreditService,
              private router: Router,
              private token: TokenService,
              private customerService: CustomersService) { }

    userInfo(): void {
      const userName = this.token.getUserName();
      this.customerService.customer(userName).subscribe(value=>{
        console.log(value);
        this.user = value;  
        
      });
    }
  ngOnInit(): void {

    this.userInfo();

    this.setupStripePaymentForm();

    this.reviewCartDetails();

    this.checkoutFormGroup! = this.formBuilder.group({
  
      customer: this.formBuilder.group({
        userName: new FormControl(this.token.getUserName(),
                                  [Validators.required, 
                                   Validators.minLength(2), 
                                   ShopValidators.notOnlyWhitespace])      
                                }),
  
                              });
  }
  
  setupStripePaymentForm() {
    
    // conseguir un encabezado a los elementos de stripe
    var elements = this.stripe.elements();

    //
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // crear el elemento card... y ocultar el campo zip-code
    this.cardElement = elements.create('card', { hidePostalCode: true, style: style});

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

    // ingresar en cartService.orderTrackingNumber
    this.cartService.orderTrackingNumber$.subscribe(
      orderTrackingNumber => this.orderTrackingNumber = orderTrackingNumber
    );
  }

  get userName() { return this.checkoutFormGroup.get('customer.userName')!; }

  onSubmit() {
    // obtener el id del order item de la lista, con ese id bucscar find en la lista debshistory. agarrar el objeto un vez optenido y setear urilizae el metodo save 
  }


}
