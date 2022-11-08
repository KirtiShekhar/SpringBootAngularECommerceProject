import { Component, OnInit } from '@angular/core';
import { ProductsCategory } from 'src/app/common/products-category';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-category-menu',
  templateUrl: './products-category-menu.component.html',
  styleUrls: ['./products-category-menu.component.css']
})
export class ProductsCategoryMenuComponent implements OnInit
{

  productCategories: ProductsCategory[] = [];


  constructor(private productService: ProductsService) { }

  ngOnInit()
  {
    this.listProductsCategories();
  }

  listProductsCategories()
  {
    this.productService.getProductsCategoriesList().subscribe(
      data => {
        console.log("Product Categories :" + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
