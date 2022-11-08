package com.springboot.ecommerce.controller;

import com.springboot.ecommerce.entity.Country;
import com.springboot.ecommerce.entity.State;
import com.springboot.ecommerce.service.CountryStateService;
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
@RequestMapping("/api")
public class CountryStateController
{
    Logger CountryStateECommerceAngularLogger = LoggerFactory.getLogger(CountryStateController.class);

    @Autowired
    CountryStateService countryStateService;

    @GetMapping(value = "/country/getById")
    @Operation(summary = "fetch country for given country Id from database")
    public Country getCountryById(@RequestParam Integer id)
    {
        CountryStateECommerceAngularLogger.info("fetch country for given country Id from database");
        return countryStateService.getCountryById(id);
    }

    @GetMapping(value = "/country/all")
    @Operation(summary = "fetch all country from database")
    public List<Country> getAllCountries()
    {
        CountryStateECommerceAngularLogger.info("fetch all country from database");
        return countryStateService.getAllCountries();
    }

    @GetMapping(value = "/states/all")
    @Operation(summary = "fetch all states from database")
    public List<State> getAllStates()
    {
        CountryStateECommerceAngularLogger.info("fetch all states from database");
        return countryStateService.getAllStates();
    }

    @GetMapping(value = "states/getStatesByCountryCode")
    @Operation(summary = "fetch states for given country code from database")
    public List<State> getStatesByCountryCode(@RequestParam String countryCode)
    {
        CountryStateECommerceAngularLogger.info("fetch states for given country code from database");
        return countryStateService.getStatesByCountryCode(countryCode);
    }
}
