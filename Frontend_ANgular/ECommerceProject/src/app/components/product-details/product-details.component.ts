import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Products } from 'src/app/common/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productsDetails: Products = new Products();
  theProductId: number = 1;

  constructor(private productService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails()
  {
    this.theProductId = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getSingleProduct(this.theProductId).subscribe(
      data => {
        this.productsDetails = data;
      })
  }

  addProductToCart()
  {
    console.log(`Adding Product to cart: ${this.productsDetails.productName}, ${this.productsDetails.productPrice}`);

    const theCartItems = new CartItem(this.productsDetails);
    this.cartService.addProductsToCart(theCartItems);
  }

}
