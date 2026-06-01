package com.spring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cart_id;
	@Column(length =100)
	private String user_email;
	private Long product_id;
	private Long product_quantity;
	
	
	public Long getCart_id() {
		return cart_id;
	}
	public void setCart_id(Long cart_id) {
		this.cart_id = cart_id;
	}
	public String getUser_email() {
		return user_email;
	}
	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}
	public Long getProduct_id() {
		return product_id;
	}
	public void setProduct_id(Long product_id) {
		this.product_id = product_id;
	}
	public Long getProduct_quantity() {
		return product_quantity;
	}
	public void setProduct_quantity(Long product_quantity) {
		this.product_quantity = product_quantity;
	}
	@Override
	public String toString() {
		return "Cart [cart_id=" + cart_id + ", user_email=" + user_email + ", product_id=" + product_id
				+ ", product_quantity=" + product_quantity + "]";
	}
	
	
}