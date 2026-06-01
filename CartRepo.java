package com.spring.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.entity.Cart;
import java.util.Optional;
import java.util.List;



public interface CartRepo extends JpaRepository<Cart, Long>{

//	@Query("from Cart where product_id= :product_id")
//	Optional<Cart> findByProduct_id(@Param("product_id") Long  product_id);
	
	@Query("from Cart where product_id= :product_id and user_email=:user_email")
	Optional<Cart> findByProduct_idAndUser_email(@Param("product_id")long product_id,@Param("user_email") String user_email);
	
	@Query("from Cart where user_email=:user_email")
    List<Cart> findByUser_email(@Param("user_email")String user_email);
}
