package com.spring.dto;

import jakarta.validation.constraints.*;

public class ProductDTO {
    
    private Long prod_id;

    @NotBlank(message = "Product name is required")
    @Size(max = 100, message = "Product name must be less than 100 characters")
    private String prod_name;

    @NotBlank(message = "Category is required")
    private String prod_category;

    @Min(value = 0, message = "Quantity must be 0 or more")
    private int prod_quantity;

    @Positive(message = "Price must be greater than 0")
    private double prod_price;

    private String prod_description;

    
    public Long getProd_id() { return prod_id; }
    public String getProd_name() { return prod_name; }
    public String getProd_category() { return prod_category; }
    public int getProd_quantity() { return prod_quantity; }
    public double getProd_price() { return prod_price; }
    public String getProd_description() { return prod_description; }

    
    public void setProd_id(Long prod_id) { this.prod_id = prod_id; }
    public void setProd_name(String prod_name) { this.prod_name = prod_name; }
    public void setProd_category(String prod_category) { this.prod_category = prod_category; }
    public void setProd_quantity(int prod_quantity) { this.prod_quantity = prod_quantity; }
    public void setProd_price(double prod_price) { this.prod_price = prod_price; }
    public void setProd_description(String prod_description) { this.prod_description = prod_description; }
}