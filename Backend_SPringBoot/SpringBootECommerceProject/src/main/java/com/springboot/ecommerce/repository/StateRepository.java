package com.springboot.ecommerce.repository;

import com.springboot.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StateRepository extends JpaRepository<State,Integer>
{
    List<State> findByCountryCountryCode(@Param("countryCode") String countryCode);
}