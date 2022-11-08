import { Products } from "./products";

export class CartItem
{
  id: string;
  productName: string;
  productPrice: number;
  imageUrl: string;
  productQuantity:number;

  constructor(products: Products)
  {
    this.id = products.id!;
    this.productName = products.productName!;
    this.productPrice = products.productPrice!;
    this.imageUrl = products.imageUrl!;
    this.productQuantity = 1;
  }
}
