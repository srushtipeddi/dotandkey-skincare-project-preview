package com.spring.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.entity.OrderData;

public interface  OrderDataRepo extends JpaRepository<OrderData, Long> {
	
	List<OrderData> findByCustomerEmail(String customerEmail);

}
