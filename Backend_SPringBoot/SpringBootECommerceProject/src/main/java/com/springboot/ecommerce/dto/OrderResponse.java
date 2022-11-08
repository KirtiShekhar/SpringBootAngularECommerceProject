package com.springboot.ecommerce.dto;

import com.springboot.ecommerce.entity.Address;
import com.springboot.ecommerce.entity.Customer;
import com.springboot.ecommerce.entity.Order;
import com.springboot.ecommerce.entity.OrderItem;

import java.util.Set;

public class OrderResponse
{
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
