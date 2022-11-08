package com.springboot.ecommerce.service;

import com.springboot.ecommerce.entity.Product;
import com.springboot.ecommerce.entity.ProductCategory;

import java.util.List;
import java.util.Optional;

public interface ProductService
{
    List<Product> getAllProducts();
    List<Product> getProductByCategoryId(Long id);
    List<ProductCategory> getAllCategories();
    List<Product> getProductByNameLike(String productName);
    Product getProductById(Long id);
}
