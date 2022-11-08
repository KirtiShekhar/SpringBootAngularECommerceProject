package com.springboot.ecommerce.controller;

import com.springboot.ecommerce.dto.PaymentInfo;
import com.springboot.ecommerce.dto.PurchaseRequest;
import com.springboot.ecommerce.dto.PurchaseResponse;
import com.springboot.ecommerce.entity.Order;
import com.springboot.ecommerce.service.OrderPurchaseService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderPurchaseController
{
    Logger OrderPurchaseECommerceAngularLogger = LoggerFactory.getLogger(OrderPurchaseController.class);

    @Autowired
    OrderPurchaseService orderPurchaseService;

    @PostMapping("/purchase/orderItems")
    @Operation(summary = "save the purchased order details to the database")
    public PurchaseResponse placeFinalProductsOrder(@RequestBody PurchaseRequest purchaseRequest)
    {
        OrderPurchaseECommerceAngularLogger.info("save the purchased order details to the database");
        return orderPurchaseService.placeFinalProductsOrder(purchaseRequest);
    }

    @GetMapping("/purchase/getOrderHistory")
    @Operation(summary = "get Order History details from the database for the given email address")
    public List<Order> getOrderByCustomerEmailAddress(@RequestParam String emailAddress)
    {
        OrderPurchaseECommerceAngularLogger.info("get Order History details from the database for the given email address");
        return orderPurchaseService.getOrderByCustomerEmailAddress(emailAddress);
    }

    @PostMapping("/purchase/paymentIntent")
    @Operation(summary = "make the payment method for the checkout items")
    public ResponseEntity<String> createOrderCheckoutPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException
    {
        PaymentIntent paymentIntent = orderPurchaseService.createOrderCheckoutPaymentIntent(paymentInfo);
        OrderPurchaseECommerceAngularLogger.info("make the payment method for the checkout items");
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }
}