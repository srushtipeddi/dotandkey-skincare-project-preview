	package com.spring.entity;
	
	import jakarta.persistence.*;
	
	@Entity
	@Table(name = "shades")
	public class Shade {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long shade_id;
	
	    private Long productId;
	    private String shade_name;
	    private String shade_color;
	    private String shade_image;
	    private String shade_image1;
	    private String shade_image2;
	    private String shade_image3;
	    private int stock;
		public Long getShade_id() {
			return shade_id;
		}
		public void setShade_id(Long shade_id) {
			this.shade_id = shade_id;
		}
		public Long getProductId() {
			return productId;
		}
		public void setProductId(Long productId) {
			this.productId = productId;
		}
		public String getShade_name() {
			return shade_name;
		}
		public void setShade_name(String shade_name) {
			this.shade_name = shade_name;
		}
		public String getShade_color() {
			return shade_color;
		}
		public void setShade_color(String shade_color) {
			this.shade_color = shade_color;
		}
		public String getShade_image() {
			return shade_image;
		}
		public void setShade_image(String shade_image) {
			this.shade_image = shade_image;
		}
		public String getShade_image1() {
			return shade_image1;
		}
		public void setShade_image1(String shade_image1) {
			this.shade_image1 = shade_image1;
		}
		public String getShade_image2() {
			return shade_image2;
		}
		public void setShade_image2(String shade_image2) {
			this.shade_image2 = shade_image2;
		}
		public String getShade_image3() {
			return shade_image3;
		}
		public void setShade_image3(String shade_image3) {
			this.shade_image3 = shade_image3;
		}
		public int getStock() {
			return stock;
		}
		public void setStock(int stock) {
			this.stock = stock;
		}
		}