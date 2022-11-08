package com.springboot.ecommerce.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Table(name="OrderItem")
@Getter
@Setter
public class OrderItem
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="imageUrl")
    private String imageUrl;

    @Column(name="productPrice")
    private BigDecimal productPrice;

    @Column(name="productQuantity")
    private int productQuantity;

    @Column(name="productId")
    private Long productId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "orderId")
    private Order order;

}
