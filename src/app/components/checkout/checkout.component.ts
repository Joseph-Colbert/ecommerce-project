import { CustomersService } from './../../services/customers.service';
import { PaymentInfo } from './../../common/payment-info';
import { CheckoutService } from './../../services/checkout.service';
import { ShopFormService } from './../../services/shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
//import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';
import { ShopValidators } from 'src/app/validators/shop-validators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  user: any;
  mail: any;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  //shippingAddressStates: State[] = [];
  //billingAddressStates: State[] = [];

  storage: Storage = sessionStorage;
  
  // inicializar la api de stripe
  stripe = Stripe(environment.stripePublishableKey);

  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";

  isDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router,
              private token: TokenService,
              private customerService: CustomersService) { }

  userInfo(): void {
    const userName = this.token.getUserName();
    this.customerService.customer(userName).subscribe(value=>{
      this.user = value;  
      console.log(value);
    });                                                                   
  }

  // userEmailInfo(): void {
  //   const mail = this.token.getUserName(); // cambiar y crear para el email
  //   this.customerService.customer(mail).subscribe(value=>{
  //     this.mail = value;  
  //     console.log(value);
  //   });                                                                   
  // }

  ngOnInit(): void {

    this.userInfo();

    // configuracion de formulario de pagos de stripe
    this.setupStripePaymentForm();

    this.reviewCartDetails();

    //read the user's email address from the browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);
    console.log(theEmail);

    this.checkoutFormGroup! = this.formBuilder.group({

      customer: this.formBuilder.group({
        
        userName: new FormControl(this.token.getUserName(),
                                  [Validators.required, 
                                  Validators.minLength(2), 
                                  ShopValidators.notOnlyWhitespace])
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

       /* state: new FormControl('', [Validators.required]),
                            
        country: new FormControl('', [Validators.required]),*/

        zipCode: new FormControl('',
                                [Validators.required, 
                                 Validators.minLength(2), 
                                 ShopValidators.notOnlyWhitespace])
        }),

      /*billingAddress: this.formBuilder.group({
        street: new FormControl('',
                                [Validators.required, 
                                 Validators.minLength(2), 
                                 ShopValidators.notOnlyWhitespace]),

        city: new FormControl('',
              [Validators.required, 
                Validators.minLength(2), 
                ShopValidators.notOnlyWhitespace]),

        state: new FormControl('', [Validators.required]),
              
        country: new FormControl('', [Validators.required]),

        zipCode: new FormControl('',
                  [Validators.required, 
                  Validators.minLength(2), 
                  ShopValidators.notOnlyWhitespace])
         }),*/

      creditCard: this.formBuilder.group({
       /* cardType: new FormControl('', [Validators.required]),

        nameOnCard: new FormControl('',
                        [Validators.required, 
                         Validators.minLength(2), 
                         ShopValidators.notOnlyWhitespace]),

        cardNumber: new FormControl('', [Validators.required, 
                                         Validators.pattern('[0-9]{16}')]),

        securityCode: new FormControl('', [Validators.required, 
                                           Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']*/
      })
    });

    //completar el mes de la tarjeta de credito
    /*
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    //completar el año de la tarjeta de credito

    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );*/

    // cantidad de paises

    this.shopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );
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
    
    // ingresar en cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // ingresar cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  get userName() { return this.checkoutFormGroup.get('customer.userName')!; }


  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street')!; }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city')!; }
  //get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode')!; }
  //get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  /*get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street')!; }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city')!; }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state')!; }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode')!; }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country')!; }*/

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType')!; }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard')!; }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber')!; }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode')!; }


  /*copyShippingAdressToBillingAddress(event: any) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
          
      this.billingAddressStates = this.shippingAddressStates;      
    } 
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAddressStates = [];      
    }

  }*/

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched;
      return
    }
    // configurar orden
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // obtener items 
    const cartItems = this.cartService.cartItems;

    // crear orderItems de cartItems
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // configurar compras
    let purchase = new Purchase();

    // completar compra - customer
    purchase.customer = this.user;
 
    // completar compra - shipping address
   /* purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;*/

    // populate purchase - billing address
    /*purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;*/

    // completar compra - order y orderItem
    purchase.order = order;
    console.log(`${purchase.order}`);

    purchase.orderItems = orderItems;
    console.log(`${purchase.orderItems}`);

    // calcular la inforacion de pago
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "USD";

    //this.paymentInfo.receipEmail = purchase.customer.email;

    console.log(`this.paymentInfo.amount: ${this.paymentInfo.amount}`);
    console.log(`this.paymentInfo.amount: ${this.paymentInfo}`);

    // si el formulario es valido entonces
    // crear el intento de pago
    // confirmar el pago con la tarjeta
    // realizar pedido

    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {

      this.isDisabled = true;
      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement,
                billing_details: {
                  name: this.checkoutFormGroup.get('customer.userName')?.value,
                  address: {
                    line1: this.checkoutFormGroup.get('shippingAddress.street')?.value,
                    city: this.checkoutFormGroup.get('shippingAddress.city')?.value,
                    postal_code: this.checkoutFormGroup.get('shippingAddress.zipCode')?.value
                  }

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
                this.checkoutService.placeOrder(purchase).subscribe({
                  next: (response: any) => {
                    Swal.fire({
                      title: 'Su orden fue recibida.\n Tracking number:', 
                      text: response.orderTrackingNumber,
                      icon:'success'}); 
                    //alert(`Su orden fue recibida.\n Tracking number: ${response.orderTrackingNumber}`);

                    // limpiamos el carrito
                    this.resetCart();
                    this.isDisabled = false;
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
    


    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer')!.value.email);

  //revisar, devuelve el resultado como undefined!!!!!! IMPORTANTE
   // console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')?.value.country.name);
   // console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress')?.value.state.name);
    console.log(this.checkoutFormGroup.get('shippingAddress')!.value);
    //REVISAR!!!!!
  
  }

  resetCart() {
    // reiniciar el carrito
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems(); // para cuando se haga un a compra no se mantenga en la sesion los ultimos productos del carrito

    // reiniciar el formulario
    this.checkoutFormGroup.reset();

    // volver a la ventana de productos
    this.router.navigateByUrl("/products")
  }

  handleMonthsAndYears() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear : number = Number(creditCardFormGroup?.value.expirationYear);

    //si el año actual es igual al seleccionado, entonces empezar con el mes actual

    let startMonth: number;

    if (currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    } 
    else {
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrived credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  /*getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName)!;
    console.log(formGroup);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);


    this.shopFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        } 

        // seleccionar el primer estado como por default
        formGroup.get('state')!.setValue(data[0]);
      }
    );
  }*/

  volver(): void {
    this.router.navigate(['/cart-details']);
  }
}
