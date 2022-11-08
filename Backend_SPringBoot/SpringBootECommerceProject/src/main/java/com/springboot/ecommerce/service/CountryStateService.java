package com.springboot.ecommerce.service;

import com.springboot.ecommerce.entity.Country;
import com.springboot.ecommerce.entity.State;
import java.util.List;

public interface CountryStateService
{
    List<Country> getAllCountries();
    List<State> getStatesByCountryCode(String countryCode);
    List<State> getAllStates();
    Country getCountryById(Integer id);
}
