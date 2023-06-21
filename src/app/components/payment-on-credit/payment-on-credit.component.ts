import { DebtsService } from 'src/app/services/debts.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentInfo } from 'src/app/common/payment-info';
import { CartPaymentOnCreditService } from 'src/app/services/cart-payment-on-credit.service';
import { CustomersService } from 'src/app/services/customers.service';
import { PaymentOnCreditService } from 'src/app/services/payment-on-credit.service';
import { TokenService } from 'src/app/services/token.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { PaymentOnCredit } from 'src/app/common/payment-on-credit';

@Component({
  selector: 'app-payment-on-credit',
  templateUrl: './payment-on-credit.component.html',
  styleUrls: ['./payment-on-credit.component.css']
})
export class PaymentOnCreditComponent implements OnInit {

  cargado: boolean = false;

  checkoutFormGroup!: FormGroup;
  user: any;
  orderTrackingNumber!: string;
  historia!: any;

  storage: Storage = sessionStorage;

  // inicializar la api de stripe
  stripe = Stripe(environment.stripePublishableKey);

    paymentInfo: PaymentInfo = new PaymentInfo();
    cardElement: any;
    displayError: any = "";

    isDisabled: boolean = false;

    debts!: any;

  constructor(private formBuilder: FormBuilder,
              private cartService: CartPaymentOnCreditService,
              private checkoutServiceOnCredit: PaymentOnCreditService,
              private router: Router,
              private token: TokenService,
              private customerService: CustomersService,
              private activatedRoute: ActivatedRoute,
              private debtsService: DebtsService) { }


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

    this.orderTrackingNumber = this.activatedRoute.snapshot.paramMap.get('orderTrackingNumber')!;
    this.checkoutFormGroup! = this.formBuilder.group({
  
      customer: this.formBuilder.group({
        userName: new FormControl(this.token.getUserName(),
                                  [Validators.required, 
                                   Validators.minLength(2), 
                                   ShopValidators.notOnlyWhitespace])      
                                }),
  
                              });

    this.historial();

  }

  historial() {
    this.debtsService.getDebtsHistoryOrders(this.orderTrackingNumber).subscribe(value =>{
      this.historia = value._embedded.orderItemOnCredits[0];
    }
      )
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
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched;
      return
    }


    console.log(this.historia.payment);
    let purchase: any;

     purchase = this.historia;
     console.log(`${purchase.orderItemsOnCredit}`);

        // calcular la inforacion de pago
        this.paymentInfo.amount = Math.round(Number(this.historia.payment) * 100);
        this.paymentInfo.currency = "USD";
        this.paymentInfo.receiptEmail = 'joseph97cm@gmail.com'//purchase.customer.email;

        if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {

          this.isDisabled = true;
          this.checkoutServiceOnCredit.createPaymentIntentOnCredit(this.paymentInfo).subscribe(
            (paymentIntentResponse) => {
              this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
                {
                    payment_method: {
                    card: this.cardElement,
                    billing_details: {
                      name: this.checkoutFormGroup.get('customer.userName')?.value,
      
                    }
                    
                  }
                }, { handleActions: false })
                .then((result: any) => {
                  if (result.error) {
                    // informar al cliente que hubo un error 
                    alert(`Hubo un error: ${result.error.message}`);
                    this.isDisabled = false;
                  } else {
                        // llamar a la API REST via CheckoutService
                        this.checkoutServiceOnCredit.placeOrderOnCreditPayment(purchase).subscribe({
                          next: (response: any) => {
                            Swal.fire({
                            title: '', 
                            text: response.message,
                            icon:'success'}); 
                            //alert(`Su orden fue recibida.\n Tracking number: ${response.orderTrackingNumber}`);
                            this.router.navigateByUrl("/products")
                          },
                          error: (err: any) => {
                            Swal.fire({
                            title:'Error!',
                            text: err.message,
                            icon: 'error'}); 
                            //alert(`Hubo un error: ${err.message}`);
                            this.isDisabled = false;
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


}
