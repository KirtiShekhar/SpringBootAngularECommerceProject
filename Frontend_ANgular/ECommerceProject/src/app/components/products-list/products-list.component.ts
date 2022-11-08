import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Products } from 'src/app/common/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Products[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private productService: ProductsService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts()
  {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode)
    {
      this.handleSearchProducts();
    }
    else
    {
      this.handleListProducts();
    }
  }

  handleSearchProducts()
  {
    const theSearchKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //search process
    this.productService.searchProducts(theSearchKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleListProducts()
  {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // now get the products for the given category id
    this.productService.getProductsList(this.currentCategoryId).subscribe(
      data => {
        console.log("Products List :" + JSON.stringify(data));
        this.products = data;
      }
    )
  }

  addProductsToCart(theProducts: Products)
  {
    console.log(`Adding product to cart : ${theProducts.productName}, ${theProducts.productPrice}`);

    const theCartItems = new CartItem(theProducts);

    this.cartService.addProductsToCart(theCartItems);

  }

}
