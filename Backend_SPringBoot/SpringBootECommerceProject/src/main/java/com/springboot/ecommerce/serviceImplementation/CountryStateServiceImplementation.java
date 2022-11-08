package com.springboot.ecommerce.serviceImplementation;

import com.springboot.ecommerce.entity.Country;
import com.springboot.ecommerce.entity.State;
import com.springboot.ecommerce.repository.CountryRepository;
import com.springboot.ecommerce.repository.StateRepository;
import com.springboot.ecommerce.service.CountryStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryStateServiceImplementation implements CountryStateService
{
    @Autowired
    CountryRepository countryRepository;

    @Autowired
    StateRepository stateRepository;


    @Override
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    @Override
    public List<State> getStatesByCountryCode(String countryCode) {
        return stateRepository.findByCountryCountryCode(countryCode);
    }

    @Override
    public List<State> getAllStates() {
        return stateRepository.findAll();
    }

    @Override
    public Country getCountryById(Integer id)
    {
        Optional<Country> country = countryRepository.findById(id);
        return country.get();

    }
}
