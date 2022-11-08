import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  productCartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  productStorage: Storage = sessionStorage;
  //productStorage: Storage = localStorage;

  constructor() {
    // read data from storage
    let productdata = JSON.parse(
      this.productStorage.getItem('productCartItems')!
    );

    if (productdata != null) {
      this.productCartItems = productdata;
    }

    // compute totals based on the data that is read from storage
    this.computeCartItemsTotals();
  }

  addProductsToCart(productCartItem: CartItem) {
    // check if we already have the item in our cart

    let alreadyItemExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.productCartItems.length > 0) {
      // find the item in the cart based on item id

      existingCartItem = this.productCartItems.find(
        (tempCartItem) => tempCartItem.id === productCartItem.id
      )!;

      // check if we found it
      alreadyItemExistsInCart = existingCartItem != undefined;
    }

    if (alreadyItemExistsInCart) {
      //increment the quantity
      existingCartItem.productQuantity++;
    } else {
      // just add the item to the array
      this.productCartItems.push(productCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartItemsTotals();
  }

  computeCartItemsTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.productCartItems) {
      totalPriceValue +=
        currentCartItem.productQuantity * currentCartItem.productPrice;
      totalQuantityValue += currentCartItem.productQuantity;
    }

    // publish the new values ........ all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes
    this.logCartItemsData(totalPriceValue, totalQuantityValue);

    // persist cart items
    this.persistCartItems();
  }

  persistCartItems() {
    this.productStorage.setItem(
      'productCartItems',
      JSON.stringify(this.productCartItems)
    );
  }

  logCartItemsData(totalPriceValue: number, totalQuantityValue: number) {
    // display the items in cart in console
    console.log('Contents of the cart : ');
    for (let tempCartItems of this.productCartItems) {
      const subTotalPrice =
        tempCartItems.productQuantity * tempCartItems.productPrice;

      console.log(`product name : ${tempCartItems.productName},
                   product quantity : ${tempCartItems.productQuantity},
                   unit Price: ${tempCartItems.productPrice},
                   sub Total Price: ${subTotalPrice}`);
    }

    // display the total quantity and price in console
    console.log(
      'total quantity and price for Items in cart : ' +
        `total Price : ${totalPriceValue},
                   total Quantity : ${totalQuantityValue}`
    );
  }

  decrementProductQuantity(theCartItem: CartItem) {
    theCartItem.productQuantity--;

    if (theCartItem.productQuantity === 0) {
      this.removeProductFromCart(theCartItem);
    } else {
      this.computeCartItemsTotals();
    }
  }

  removeProductFromCart(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.productCartItems.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    )!;

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.productCartItems.splice(itemIndex, 1);

      this.computeCartItemsTotals();
    }
  }
}
