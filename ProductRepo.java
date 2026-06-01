package com.spring.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Long>{
	
	@Query("from Product where prod_category=:prod_category")
	List<Product> findByProd_category(@Param("prod_category") String prod_category);
	
	@Query("from Product where prod_subcategory = :prod_subcategory")
	List<Product> findByProd_subcategory(@Param("prod_subcategory") String prod_subcategory);

}
