package com.springboot.ecommerce;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Spring Boot ECommerce Angular Project", version = "2.0", description = "Spring Boot Application using Angular ECommerce Project"))
public class ECommerceApplication
{
    public static void main( String[] args )
    {
        SpringApplication.run(ECommerceApplication.class,args);
        System.out.println( "Running Application Spring Boot ECommerce Angular Project!" );
    }
}