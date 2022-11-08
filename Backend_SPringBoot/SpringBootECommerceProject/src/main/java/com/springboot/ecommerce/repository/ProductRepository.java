package com.springboot.ecommerce.repository;

import com.springboot.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>
{
    List<Product> findByCategoryId(@Param("id") Long id);
    List<Product> findByProductNameContaining(@Param("productName") String productName);
}
