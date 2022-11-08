import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../common/products';
import { ProductsCategory } from '../common/products-category';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getProductsListPagination(
    thePageNo: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<Products[]> {
    const searchUrl = `${this.baseUrl}/product/getByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<Products[]>(searchUrl);
  }

  getProductsList(theCategoryId: number): Observable<Products[]> {
    const searchUrl = `${this.baseUrl}/product/getByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<Products[]>(searchUrl);
  }

  getProductsCategoriesList(): Observable<ProductsCategory[]> {
    const categorySearchUrl = `${this.baseUrl}/product/categories/all`;

    return this.httpClient.get<ProductsCategory[]>(categorySearchUrl);
  }

  searchProducts(theSearchKeyword: string): Observable<Products[]> {
    const searchUrl = `${this.baseUrl}/product/ProductByNameLike?productName=${theSearchKeyword}`;

    return this.httpClient.get<Products[]>(searchUrl);
  }

  getSingleProduct(theProductId: number): Observable<Products> {
    // single product url
    const singleProductUrl = `${this.baseUrl}/product/getById?id=${theProductId}`;

    return this.httpClient.get<Products>(singleProductUrl);
  }
}
