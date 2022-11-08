package com.springboot.ecommerce.service;

import com.springboot.ecommerce.dto.PaymentInfo;
import com.springboot.ecommerce.dto.PurchaseRequest;
import com.springboot.ecommerce.dto.PurchaseResponse;
import com.springboot.ecommerce.entity.Order;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import java.util.List;

public interface OrderPurchaseService
{
    PurchaseResponse placeFinalProductsOrder(PurchaseRequest purchaseRequest);
    List<Order> getOrderByCustomerEmailAddress(String emailAddress);

    PaymentIntent createOrderCheckoutPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
