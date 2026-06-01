package com.spring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long prod_id;
	@Column(length =100)
	private String prod_name;
	@Column(length =255)
	private String prod_category;
	@Column(length =255)
	 private String prod_subcategory;
	@Column(length =10)
	private int prod_quantity;
	private double prod_price;
	@Column(length=900)
	private String prod_img1;
	@Column(length=900)
	private String prod_img2;
	@Column(length=900)
	private String prod_img3;
	@Column(length=900)
	private String prod_img4;
	@Column(length=255)
	private String status;
	@Column(columnDefinition = "TEXT")
	private String prod_description;
	@Column(name = "skin_concern", length = 255)
	private String skin_concern;

	@Column(name = "ingredients", length = 255)
	private String ingredients;

	@Column(name = "skin_type", length = 255)
	private String skin_type;
	
	public String getProd_description() {
		return prod_description;
	}
	public void setProd_description(String prod_description) {
		this.prod_description = prod_description;
	}
	private boolean hasShade;

	@Column(name = "shade_name1")
    private String shadeName1;
	 @Column(name = "shade_color1")
    private String shadeColor1;
	 @Column(name = "shade_image1_1")
    private String shadeImage1_1;
	 @Column(name = "shade_image1_2")
    private String shadeImage1_2;
	 @Column(name = "shade_image1_3")
    private String shadeImage1_3;

	 @Column(name = "shade_name2")
    private String shadeName2;
	 @Column(name = "shade_color2")
    private String shadeColor2;
	 @Column(name = "shade_image2_1")
    private String shadeImage2_1;
	 @Column(name = "shade_image2_2")
    private String shadeImage2_2;
	    @Column(name = "shade_image2_3")
    private String shadeImage2_3;

	    @Column(name = "shade_name3")
    private String shadeName3;
	    @Column(name = "shade_color3")
    private String shadeColor3;
	    @Column(name = "shade_image3_1")
    private String shadeImage3_1;
	    @Column(name = "shade_image3_2")
    private String shadeImage3_2;
	    @Column(name = "shade_image3_3")
    private String shadeImage3_3;

	    @Column(name = "shade_name4")
    private String shadeName4;
	    @Column(name = "shade_color4")
    private String shadeColor4;
	    @Column(name = "shade_image4_1")
    private String shadeImage4_1;
	    @Column(name = "shade_image4_2")
    private String shadeImage4_2;
	    @Column(name = "shade_image4_3")
    private String shadeImage4_3;
	public Long getProd_id() {
		return prod_id;
	}
	public void setProd_id(Long prod_id) {
		this.prod_id = prod_id;
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
	public String getProd_subcategory() {
		return prod_subcategory;
	}
	public void setProd_subcategory(String prod_subcategory) {
		this.prod_subcategory = prod_subcategory;
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
	public boolean isHasShade() {
		return hasShade;
	}
	public void setHasShade(boolean hasShade) {
		this.hasShade = hasShade;
	}
	public String getShadeName1() {
		return shadeName1;
	}
	public void setShadeName1(String shadeName1) {
		this.shadeName1 = shadeName1;
	}
	public String getShadeColor1() {
		return shadeColor1;
	}
	public void setShadeColor1(String shadeColor1) {
		this.shadeColor1 = shadeColor1;
	}
	public String getShadeImage1_1() {
		return shadeImage1_1;
	}
	public void setShadeImage1_1(String shadeImage1_1) {
		this.shadeImage1_1 = shadeImage1_1;
	}
	public String getShadeImage1_2() {
		return shadeImage1_2;
	}
	public void setShadeImage1_2(String shadeImage1_2) {
		this.shadeImage1_2 = shadeImage1_2;
	}
	public String getShadeImage1_3() {
		return shadeImage1_3;
	}
	public void setShadeImage1_3(String shadeImage1_3) {
		this.shadeImage1_3 = shadeImage1_3;
	}
	public String getShadeName2() {
		return shadeName2;
	}
	public void setShadeName2(String shadeName2) {
		this.shadeName2 = shadeName2;
	}
	public String getShadeColor2() {
		return shadeColor2;
	}
	public void setShadeColor2(String shadeColor2) {
		this.shadeColor2 = shadeColor2;
	}
	public String getShadeImage2_1() {
		return shadeImage2_1;
	}
	public void setShadeImage2_1(String shadeImage2_1) {
		this.shadeImage2_1 = shadeImage2_1;
	}
	public String getShadeImage2_2() {
		return shadeImage2_2;
	}
	public void setShadeImage2_2(String shadeImage2_2) {
		this.shadeImage2_2 = shadeImage2_2;
	}
	public String getShadeImage2_3() {
		return shadeImage2_3;
	}
	public void setShadeImage2_3(String shadeImage2_3) {
		this.shadeImage2_3 = shadeImage2_3;
	}
	public String getShadeName3() {
		return shadeName3;
	}
	public void setShadeName3(String shadeName3) {
		this.shadeName3 = shadeName3;
	}
	public String getShadeColor3() {
		return shadeColor3;
	}
	public void setShadeColor3(String shadeColor3) {
		this.shadeColor3 = shadeColor3;
	}
	public String getShadeImage3_1() {
		return shadeImage3_1;
	}
	public void setShadeImage3_1(String shadeImage3_1) {
		this.shadeImage3_1 = shadeImage3_1;
	}
	public String getShadeImage3_2() {
		return shadeImage3_2;
	}
	public void setShadeImage3_2(String shadeImage3_2) {
		this.shadeImage3_2 = shadeImage3_2;
	}
	public String getShadeImage3_3() {
		return shadeImage3_3;
	}
	public void setShadeImage3_3(String shadeImage3_3) {
		this.shadeImage3_3 = shadeImage3_3;
	}
	public String getShadeName4() {
		return shadeName4;
	}
	public void setShadeName4(String shadeName4) {
		this.shadeName4 = shadeName4;
	}
	public String getShadeColor4() {
		return shadeColor4;
	}
	public void setShadeColor4(String shadeColor4) {
		this.shadeColor4 = shadeColor4;
	}
	public String getShadeImage4_1() {
		return shadeImage4_1;
	}
	public void setShadeImage4_1(String shadeImage4_1) {
		this.shadeImage4_1 = shadeImage4_1;
	}
	public String getShadeImage4_2() {
		return shadeImage4_2;
	}
	public void setShadeImage4_2(String shadeImage4_2) {
		this.shadeImage4_2 = shadeImage4_2;
	}
	public String getShadeImage4_3() {
		return shadeImage4_3;
	}
	public void setShadeImage4_3(String shadeImage4_3) {
		this.shadeImage4_3 = shadeImage4_3;
	}
	
	public String getSkin_concern() {
		return skin_concern;
	}
	public void setSkin_concern(String skin_concern) {
		this.skin_concern = skin_concern;
	}
	public String getIngredients() {
		return ingredients;
	}
	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
	}
	public String getSkin_type() {
		return skin_type;
	}
	public void setSkin_type(String skin_type) {
		this.skin_type = skin_type;
	}
	@Override
	public String toString() {
		return "Product [prod_id=" + prod_id + ", prod_name=" + prod_name + ", prod_category=" + prod_category
				+ ", prod_subcategory=" + prod_subcategory + ", prod_quantity=" + prod_quantity + ", prod_price="
				+ prod_price + ", prod_img1=" + prod_img1 + ", prod_img2=" + prod_img2 + ", prod_img3=" + prod_img3
				+ ", prod_img4=" + prod_img4 + ", status=" + status + ", prod_description=" + prod_description
				+ ", skin_concern=" + skin_concern + ", ingredients=" + ingredients + ", skin_type=" + skin_type
				+ ", hasShade=" + hasShade + ", shadeName1=" + shadeName1 + ", shadeColor1=" + shadeColor1
				+ ", shadeImage1_1=" + shadeImage1_1 + ", shadeImage1_2=" + shadeImage1_2 + ", shadeImage1_3="
				+ shadeImage1_3 + ", shadeName2=" + shadeName2 + ", shadeColor2=" + shadeColor2 + ", shadeImage2_1="
				+ shadeImage2_1 + ", shadeImage2_2=" + shadeImage2_2 + ", shadeImage2_3=" + shadeImage2_3
				+ ", shadeName3=" + shadeName3 + ", shadeColor3=" + shadeColor3 + ", shadeImage3_1=" + shadeImage3_1
				+ ", shadeImage3_2=" + shadeImage3_2 + ", shadeImage3_3=" + shadeImage3_3 + ", shadeName4=" + shadeName4
				+ ", shadeColor4=" + shadeColor4 + ", shadeImage4_1=" + shadeImage4_1 + ", shadeImage4_2="
				+ shadeImage4_2 + ", shadeImage4_3=" + shadeImage4_3 + "]";
	}
	
}