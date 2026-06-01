package com.spring;


public class ProductCart_Info {
	
	private Long cart_id;
	private String user_email;
	private Long product_id;
	private Long product_quantity;
	
	private String prod_name;
	private String prod_category;
	private int prod_quantity;
	private double prod_price;
	private String prod_img1;
	private String prod_img2;
	private String prod_img3;
	private String prod_img4;
	private String status;
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
	public String getProd_name() {
		return prod_name;
	}
	public void setProd_name(String prod_name) {
		this.prod_name = prod_name;
	}
	public String getProd_category() {
		return prod_category;
	}
	public void setProd_category(String prod_category) {
		this.prod_category = prod_category;
	}
	public int getProd_quantity() {
		return prod_quantity;
	}
	public void setProd_quantity(int prod_quantity) {
		this.prod_quantity = prod_quantity;
	}
	public double getProd_price() {
		return prod_price;
	}
	public void setProd_price(double prod_price) {
		this.prod_price = prod_price;
	}
	public String getProd_img1() {
		return prod_img1;
	}
	public void setProd_img1(String prod_img1) {
		this.prod_img1 = prod_img1;
	}
	public String getProd_img2() {
		return prod_img2;
	}
	public void setProd_img2(String prod_img2) {
		this.prod_img2 = prod_img2;
	}
	public String getProd_img3() {
		return prod_img3;
	}
	public void setProd_img3(String prod_img3) {
		this.prod_img3 = prod_img3;
	}
	public String getProd_img4() {
		return prod_img4;
	}
	public void setProd_img4(String prod_img4) {
		this.prod_img4 = prod_img4;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "ProductCart_Info [cart_id=" + cart_id + ", user_email=" + user_email + ", product_id=" + product_id
				+ ", product_quantity=" + product_quantity +  ", prod_name=" + prod_name
				+ ", prod_category=" + prod_category + ", prod_quantity=" + prod_quantity + ", prod_price=" + prod_price
				+ ", prod_img1=" + prod_img1 + ", prod_img2=" + prod_img2 + ", prod_img3=" + prod_img3 + ", prod_img4="
				+ prod_img4 + ", status=" + status + "]";
	}
	
	
	
	

}
