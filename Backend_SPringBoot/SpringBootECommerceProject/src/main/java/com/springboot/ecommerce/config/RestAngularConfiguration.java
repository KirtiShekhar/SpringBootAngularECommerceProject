package com.springboot.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

@Configuration
public class RestAngularConfiguration implements WebMvcConfigurer
{
    @Value("${allowed.origins}")
    private String[] crossAllowedOrigins;

    @Value("${spring.data.rest.base-path}")
    private String restApiBasePath;

    @Override
    public void addCorsMappings(CorsRegistry registry)
    {
        // set up cors mapping
        registry.addMapping(restApiBasePath + "/**").allowedOrigins(crossAllowedOrigins);
    }
}
