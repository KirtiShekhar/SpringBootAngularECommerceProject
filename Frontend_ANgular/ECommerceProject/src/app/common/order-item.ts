import { CartItem } from './cart-item';

export class OrderItem {
  imageUrl!: String;
  productPrice!: number;
  productQuantity!: number;
  productId!: String;

  constructor(cartItems: CartItem) {
    this.imageUrl = cartItems.imageUrl;
    this.productPrice = cartItems.productPrice;
    this.productQuantity = cartItems.productQuantity;
    this.productId = cartItems.id;
  }
}
