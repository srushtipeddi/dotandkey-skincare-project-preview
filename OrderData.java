package com.spring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;

@Entity
public class OrderData {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long orderInfo_id;
	
	private long productId;
	 private String productName;     
	    private Double productPrice;
	private int  quantity;
	private Double totalPrice;
	@Column(length =100)
    private String customerName;      
    @Column(length = 100)
    private String customerEmail;     
    private long customerPhone;       
    private String deliveryAddress;
    private String paymentMethod;
    private String orderStatus = "Pending";
    
    @Transient
    private Product product;
    
    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

	public long getOrderInfo_id() {
		return orderInfo_id;
	}

	public void setOrderInfo_id(long orderInfo_id) {
		this.orderInfo_id = orderInfo_id;
	}

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(Double productPrice) {
		this.productPrice = productPrice;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerEmail() {
		return customerEmail;
	}

	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}

	public long getCustomerPhone() {
		return customerPhone;
	}

	public void setCustomerPhone(long customerPhone) {
		this.customerPhone = customerPhone;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	@Override
	public String toString() {
		return "OrderData [orderInfo_id=" + orderInfo_id + ", productId=" + productId + ", productName=" + productName
				+ ", productPrice=" + productPrice + ", quantity=" + quantity + ", totalPrice=" + totalPrice
				+ ", customerName=" + customerName + ", customerEmail=" + customerEmail + ", customerPhone="
				+ customerPhone + ", deliveryAddress=" + deliveryAddress + ", orderStatus=" + orderStatus + ", product="
				+ product + "]";
	}
    
}