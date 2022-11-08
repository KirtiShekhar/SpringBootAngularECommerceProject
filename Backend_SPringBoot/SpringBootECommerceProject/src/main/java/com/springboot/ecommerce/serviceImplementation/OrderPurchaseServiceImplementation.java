package com.springboot.ecommerce.serviceImplementation;

import com.springboot.ecommerce.dto.PaymentInfo;
import com.springboot.ecommerce.dto.PurchaseRequest;
import com.springboot.ecommerce.dto.PurchaseResponse;
import com.springboot.ecommerce.entity.Customer;
import com.springboot.ecommerce.entity.Order;
import com.springboot.ecommerce.entity.OrderItem;
import com.springboot.ecommerce.repository.CustomerRepository;
import com.springboot.ecommerce.repository.OrderRepository;
import com.springboot.ecommerce.service.OrderPurchaseService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderPurchaseServiceImplementation implements OrderPurchaseService
{
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    OrderRepository orderRepository;

    @Value("${stripe.key.secret}")
    private String stripeSecretKey;

    @Override
    public PurchaseResponse placeFinalProductsOrder(PurchaseRequest purchaseRequest)
    {
        // retrieve the order info from dto
        Order order = purchaseRequest.getOrder();

        // generate tracking number
        String orderPlacedTrackingNumber = generateOrderPlacedTrackingNumber();
        order.setOrderTrackingNumber(orderPlacedTrackingNumber);

        // populate order with order Items
        Set<OrderItem> orderItems = purchaseRequest.getOrderItems();
        orderItems.forEach(items -> order.add(items));

        // populate order with billing Address and Shipping Address
        order.setBillingAddress(purchaseRequest.getBillingAddress());
        order.setShippingAddress(purchaseRequest.getShippingAddress());

        // populate customer with order
        Customer customer = purchaseRequest.getCustomer();

        // check if this is existing customer
        Customer existingEmail = customerRepository.findByEmailAddress(customer.getEmailAddress());

        if(existingEmail != null)
        {
            customer = existingEmail;
        }

        customer.add(order);

        // save to a database
        customerRepository.save(customer);

        // return a response
        return new PurchaseResponse(orderPlacedTrackingNumber);
    }

    private String generateOrderPlacedTrackingNumber()
    {
        // generate a random UUID number
        //
        return UUID.randomUUID().toString();
    }

    @Override
    public List<Order> getOrderByCustomerEmailAddress(String emailAddress) {
        return orderRepository.findByCustomerEmailAddress(emailAddress);
    }

    @Override
    public PaymentIntent createOrderCheckoutPaymentIntent(PaymentInfo paymentInfo) throws StripeException
    {
        Stripe.apiKey = stripeSecretKey;
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfo.getAmount());
        params.put("currency", paymentInfo.getCurrency());
        params.put("payment_method_types", paymentMethodTypes);
        params.put("description", "ECommerce Shopping Application using spring boot and angular");
        params.put("receipt_email", paymentInfo.getReceiptEmail());

        return PaymentIntent.create(params);
    }
}
