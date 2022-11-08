package com.springboot.ecommerce.controller;

import com.springboot.ecommerce.entity.Product;
import com.springboot.ecommerce.entity.ProductCategory;
import com.springboot.ecommerce.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController
{
    Logger ProductsECommerceAngularLogger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    ProductService productService;

    @GetMapping(value = "/getByCategoryId")
    @Operation(summary = "fetch product for given product Category Id from database")
    public List<Product> getProductByCategoryId(@RequestParam Long id)
    {
        ProductsECommerceAngularLogger.info("fetch product for given product Category Id from database");
        return productService.getProductByCategoryId(id);
    }

    @GetMapping(value = "/getById")
    @Operation(summary = "fetch product for given product Id from database")
    public Product getProductById(@RequestParam Long id)
    {
        ProductsECommerceAngularLogger.info("fetch product for given product Id from database");
        return productService.getProductById(id);
    }

    @GetMapping(value = "/all")
    @Operation(summary = "fetch all products from database")
    public List<Product> getAllProducts()
    {
        ProductsECommerceAngularLogger.info("fetch all products from database");
        return productService.getAllProducts();
    }

    @GetMapping(value = "/categories/all")
    @Operation(summary = "fetch all categories from database")
    public List<ProductCategory> getAllCategories()
    {
        ProductsECommerceAngularLogger.info("fetch all categories from database");
        return productService.getAllCategories();
    }

    @GetMapping(value = "/ProductByNameLike")
    @Operation(summary = "fetch product for given product name from database")
    public List<Product> getProductByNameLike(@RequestParam String productName)
    {
        ProductsECommerceAngularLogger.info("fetch product for given product name from database");
        return productService.getProductByNameLike(productName);
    }
}
