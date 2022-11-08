import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { PaymentInfo } from 'src/app/common/payment-info';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopFormService } from 'src/app/services/shop-form.service';
import { ShopValidators } from 'src/app/validators/shop-validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  states: State[] = [];
  checkOutFormGroups!: FormGroup;
  isDisabled: boolean = false;

  // initialize Stripe API
  stripeAPI = Stripe(environment.stripePublishableKey);

  paymentInfo!: PaymentInfo;
  cardElement: any;
  displayError: any;

  constructor(
    private checkoutFormBuilder: FormBuilder,
    private shopFormService: ShopFormService,
    private cartService: CartService,
    private checkOutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setUpStripePaymentForm();

    this.reviewShoppingCartDetails();

    this.checkOutFormGroups = this.checkoutFormBuilder.group({
      customer: this.checkoutFormBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
        emailAddress: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
        contactNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[7-9]{1}[0-9]{9}'),
          Validators.maxLength(10),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
      }),
      shippingAddress: this.checkoutFormBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
      }),
      billingAddress: this.checkoutFormBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
      }),
      creditCard: this.checkoutFormBuilder.group({
        /*    cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.maxLength(16),
          Validators.pattern('[0-9]{16}'),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern('[0-9]{3}'),
          ShopValidators.notOnlyWhiteSpaces,
        ]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required]),*/
      }),
    });

    /*  // populate credit card months

    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);

    this.shopFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    // populate credit card years

    this.shopFormService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieved credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });*/

    // populate countries

    this.shopFormService.getCountries().subscribe((data) => {
      console.log('Retrieved countries: ' + JSON.stringify(data));
      this.countries = data;
    });

    // populate countries

    this.shopFormService.getStates().subscribe((data) => {
      console.log('Retrieved states: ' + JSON.stringify(data));
      this.states = data;
    });
  }

  // set Up Stripe Payment Form
  setUpStripePaymentForm() {
    // get a handle to stripe elements
    var elements = this.stripeAPI.elements();

    // create a card element
    this.cardElement = elements.create('card', { hidePostalCode: true });

    // add an instance of card UI component into card element div
    this.cardElement.mount('#card-element');

    // add event binding for the change event on card elelmt
    this.cardElement.on('change', (event: any) => {
      // get a handle to card error element
      this.displayError = document.getElementById('card-errors');

      if (event.complete) {
        this.displayError.textContent = '';
      } else if (event.error) {
        // show validation error to customer
        this.displayError.textContent = event.error.message;
      }
    });
  }

  // populate form customers,shipping address , billing address and credit card  fields
  get firstName() {
    return this.checkOutFormGroups.get('customer.firstName');
  }
  get lastName() {
    return this.checkOutFormGroups.get('customer.lastName');
  }
  get emailAddress() {
    return this.checkOutFormGroups.get('customer.emailAddress');
  }
  get contactNumber() {
    return this.checkOutFormGroups.get('customer.contactNumber');
  }

  get shippingAddressStreet() {
    return this.checkOutFormGroups.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkOutFormGroups.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkOutFormGroups.get('shippingAddress.state');
  }
  get shippingAddressCountry() {
    return this.checkOutFormGroups.get('shippingAddress.country');
  }
  get shippingAddressZipCode() {
    return this.checkOutFormGroups.get('shippingAddress.zipCode');
  }

  get billingAddressStreet() {
    return this.checkOutFormGroups.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkOutFormGroups.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkOutFormGroups.get('billingAddress.state');
  }
  get billingAddressCountry() {
    return this.checkOutFormGroups.get('billingAddress.country');
  }
  get billingAddressZipCode() {
    return this.checkOutFormGroups.get('billingAddress.zipCode');
  }

  get creditCardCardType() {
    return this.checkOutFormGroups.get('creditCard.cardType');
  }
  get creditCardNameOnCard() {
    return this.checkOutFormGroups.get('creditCard.nameOnCard');
  }
  get creditCardCardNumber() {
    return this.checkOutFormGroups.get('creditCard.cardNumber');
  }
  get creditCardSecurityCode() {
    return this.checkOutFormGroups.get('creditCard.securityCode');
  }
  get creditCardExpirationMonth() {
    return this.checkOutFormGroups.get('creditCard.expirationMonth');
  }
  get creditCardExpirationYear() {
    return this.checkOutFormGroups.get('creditCard.expirationYear');
  }

  copyAddress(event: any) {
    if (event.target.checked) {
      this.checkOutFormGroups.controls['billingAddress'].setValue(
        this.checkOutFormGroups.controls['shippingAddress'].value
      );
    } else {
      this.checkOutFormGroups.controls['billingAddress'].reset();
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkOutFormGroups.get('creditCard')!;

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup.value.expirationYear
    );

    // if the current year equals the selected year, then start with the current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  reviewShoppingCartDetails() {
    // subscribe to cartService.total Quantity
    this.cartService.totalQuantity.subscribe(
      (totalQuantity) => (this.totalQuantity = totalQuantity)
    );

    // subscribe to cartService.total Price
    this.cartService.totalPrice.subscribe(
      (totalPrice) => (this.totalPrice = totalPrice)
    );
  }

  onSubmitOrderItems() {
    console.log('Ordering The items on Click Purchase button');

    if (this.checkOutFormGroups.invalid) {
      this.checkOutFormGroups.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.productCartItems;

    // create order items from cart Items
    let orderItems: OrderItem[] = cartItems.map(
      (tempCartItems) => new OrderItem(tempCartItems)
    );

    // set up purchase
    let purchase = new Purchase();

    // populate purchase customer
    purchase.customer = this.checkOutFormGroups.controls['customer'].value;

    // populate purchase shipping address
    purchase.shippingAddress =
      this.checkOutFormGroups.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(
      JSON.stringify(purchase.shippingAddress.state)
    );
    const shippingCountry: Country = JSON.parse(
      JSON.stringify(purchase.shippingAddress.country)
    );
    purchase.shippingAddress.state = shippingState.stateName;
    purchase.shippingAddress.country = shippingCountry.countryName;

    // populate purchase billing address
    purchase.billingAddress =
      this.checkOutFormGroups.controls['billingAddress'].value;
    const billingState: State = JSON.parse(
      JSON.stringify(purchase.billingAddress.state)
    );
    const billingCountry: Country = JSON.parse(
      JSON.stringify(purchase.billingAddress.country)
    );
    purchase.billingAddress.state = billingState.stateName;
    purchase.billingAddress.country = billingCountry.countryName;

    // populate purchase order and order items
    purchase.order = order;
    purchase.orderItems = orderItems;

    // compute payment info
    this.paymentInfo.amount = this.totalPrice * 100;
    this.paymentInfo.currency = 'USD';

    // call rest api via the Checkout service

    // if valid form then
    if (
      !this.checkOutFormGroups.invalid &&
      this.displayError.textContent === ''
    ) {
      this.isDisabled = true;
      // - create payment intent
      this.checkOutService
        .createOrderCheckoutPaymentIntent(this.paymentInfo)
        .subscribe((cardPaymentResponse) => {
          // - confirm card payment
          this.stripeAPI
            .confirmCardPayment(
              cardPaymentResponse.client_secret,
              {
                payment_method: {
                  card: this.cardElement,
                  billing_details: {
                    email: purchase.customer.emailAddress,
                    name: `${purchase.customer.firstName} ${purchase.customer.lastName}`,
                    address: {
                      line1: purchase.billingAddress.street,
                      city: purchase.billingAddress.city,
                      state: purchase.billingAddress.state,
                      postal_code: purchase.billingAddress.zipCode,
                      country: purchase.shippingAddress.country,
                    },
                  },
                },
              },
              { handleActions: false }
            )
            .then((result) => {
              if (result.error) {
                // inform the customer there was an error
                alert(`There was an error: ${result.error.message}`);
                this.isDisabled = false;
              } else {
                // call REST API via the CheckoutService
                this.checkOutService.placeOrder(purchase).subscribe({
                  next: (response) => {
                    alert(
                      `Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`
                    );

                    // reset cart
                    this.resetCart();
                    this.isDisabled = false;
                  },
                  error: (err) => {
                    alert(`There was an error: ${err.message}`);
                    this.isDisabled = false;
                  },
                });
              }
            });
        });
    } else {
      this.checkOutFormGroups.markAllAsTouched();
      return;
    }
  }
  /*   this.checkOutService.placeOrder(purchase).subscribe({
      next: (response) => {
        alert(
          `Your Order has been received. \n Oder tracking number: ${response.orderTrackingNumber}`
        );

        // reset cart
        this.resetCart();
      },
      error: (err) => {
        alert(`There was an error : ${err.message}`);
      },
    });*/

  resetCart() {
    // reset cart item
    {
      // reset cart data
      this.cartService.productCartItems = [];
      this.cartService.totalPrice.next(0);
      this.cartService.totalQuantity.next(0);
      this.cartService.persistCartItems();

      // reset the form
      this.checkOutFormGroups.reset();

      // navigate back to the products page
      this.router.navigateByUrl('/product/all');
    }

    // reset the form
    this.checkOutFormGroups.reset();

    // navigate to product page
    this.router.navigateByUrl('/product/all');
  }
}
