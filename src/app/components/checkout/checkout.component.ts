import { CheckoutService } from './../../services/checkout.service';
import { ShopFormService } from './../../services/shop-form.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  storage: Storage = sessionStorage;
  

  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  ngOnInit(): void {

    this.reviewCartDetails();

    //read the user's email address from the browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);
    console.log(theEmail);

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
        email: new FormControl(theEmail,
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

        state: new FormControl('', [Validators.required]),
                            
        country: new FormControl('', [Validators.required]),

        zipCode: new FormControl('',
                                [Validators.required, 
                                 Validators.minLength(2), 
                                 ShopValidators.notOnlyWhitespace])
        }),

      billingAddress: this.formBuilder.group({
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
         }),

      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),

        nameOnCard: new FormControl('',
                        [Validators.required, 
                         Validators.minLength(2), 
                         ShopValidators.notOnlyWhitespace]),

        cardNumber: new FormControl('', [Validators.required, 
                                         Validators.pattern('[0-9]{16}')]),

        securityCode: new FormControl('', [Validators.required, 
                                           Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    //completar el mes de la tarjeta de credito

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
    );

    // cantidad de paises

    this.shopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );
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

  get firstName() { return this.checkoutFormGroup!.get('customer.firstName')!; }
  get lastName() { return this.checkoutFormGroup!.get('customer.lastName')!; }
  get email() { return this.checkoutFormGroup!.get('customer.email')!; }

  get shippingAddressStreet() { return this.checkoutFormGroup!.get('shippingAddress.street')!; }
  get shippingAddressCity() { return this.checkoutFormGroup!.get('shippingAddress.city')!; }
  get shippingAddressState() { return this.checkoutFormGroup!.get('shippingAddress.state')!; }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode')!; }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country')!; }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street')!; }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city')!; }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state')!; }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode')!; }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country')!; }

  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType')!; }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard')!; }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber')!; }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode')!; }


  copyShippingAdressToBillingAddress(event: any) {

    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
          
      this.billingAddressStates = this.shippingAddressStates;      
    } 
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAddressStates = [];      
    }

  }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched;
      return
    }
    // configurar orden
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQauntity = this.totalQuantity;

    // obtener items 
    const cartItems = this.cartService.cartItems;

    // crear orderItems de cartItems
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // configurar compras
    let purchase = new Purchase();

    // completar compra - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
 
    // completar compra - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // completar compra - billingAddress
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // completar compra - order y orderItem
    purchase.order = order;
    purchase.orderItems = orderItems;

    // Llamar API REST desde CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next:  response => {
          alert(`Su orden fue recibida.\n Número de seguimiento del pedido: ${response.orderTrackingNumber}`);

          // reiniciar el carrito
          this.resetCart();
        },
        error: err => {
          alert(`Hubo un error: ${err.message}`);
        }
      }
    );
    


    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer')!.value.email);

  //revisar, devuelve el resultado como undefined!!!!!! IMPORTANTE
    //console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')!.value.country.name);
    //console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress')!.value.state.name);
    console.log(this.checkoutFormGroup.get('shippingAddress')!.value);
    //REVISAR!!!!!
  
  }

  resetCart() {
    // reiniciar el carrito
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reiniciar el formulario
    this,this.checkoutFormGroup.reset();

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

  getStates(formGroupName: string) {

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
        //formGroup.get('state')!.setValue(data[0]);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/cart-details']);
  }
}
