package com.springboot.ecommerce.repository;

import com.springboot.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long>
{
    Customer findByEmailAddress(String emailAddress);
}
