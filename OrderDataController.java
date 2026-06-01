package com.spring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.entity.OrderData;
import com.spring.entity.Product;
import com.spring.repo.OrderDataRepo;
import com.spring.repo.ProductRepo;

@RestController
@CrossOrigin("*")
@RequestMapping("/order")
public class OrderDataController {
	
	@Autowired
	private ProductRepo  productrepo;

	@Autowired
    private OrderDataRepo orderdatarepo; 

	@PostMapping("/addOrderData")
	public String addOrderData(@RequestBody OrderData data) {
		System.out.println(data);
		
	Product prod=productrepo.findById(data.getProductId()).orElse(null);
	if (prod == null) {
        return "Error: Product not found";
    }
	   if(data.getQuantity() <=  prod.getProd_quantity()) {
			orderdatarepo.save(data);
			
		 int newQuantity= prod.getProd_quantity()-data.getQuantity();
		 prod.setProd_quantity(newQuantity);
		 productrepo.save(prod);
		 System.out.println("Order saved! Stock updated from " + (newQuantity + data.getQuantity()) + " to " + newQuantity);
	        return "Order placed successfully!";
	    } else {
	        return "Error: Only " + prod.getProd_quantity() + " items available";
	    }
	}
	
	@GetMapping("/orderHistoryByEmail")
	public List<OrderData> orderHistoryByEmail(@RequestParam String email) {
		System.out.println(email);
		List<OrderData> listOrder = orderdatarepo.findByCustomerEmail(email);
	for(OrderData data:listOrder) {
		System.out.println(data);
	Product	product=productrepo.findById(data.getProductId()).orElse(new Product());
	data.setProduct(product);
	
	}
		return listOrder;
	}
	
	 @GetMapping("/allOrders")
	    public List<OrderData> getAllOrders() {
	        List<OrderData> listOrder = orderdatarepo.findAll();

	        for (OrderData data : listOrder) {
	            Product product = productrepo.findById(data.getProductId()).orElse(new Product());
	            data.setProduct(product);
	        }

	        return listOrder;
	    }

	    @PutMapping("/updateStatus/{id}")
	    public OrderData updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> data) {
	        OrderData order = orderdatarepo.findById(id).orElse(null);

	        if (order != null) {
	            order.setOrderStatus(data.get("orderStatus"));
	            return orderdatarepo.save(order);
	        }

	        return null;
	    }

	    @GetMapping("/orderById/{id}")
	    public OrderData getOrderById(@PathVariable Long id) {
	        OrderData order = orderdatarepo.findById(id).orElse(null);

	        if (order != null) {
	            Product product = productrepo.findById(order.getProductId()).orElse(new Product());
	            order.setProduct(product);
	        }

	        return order;
	    }
	    
	    @PutMapping("/cancelOrder/{orderId}")
	    public OrderData cancelOrder(@PathVariable Long orderId) {
	        OrderData order = orderdatarepo.findById(orderId).orElse(null);

	        if (order == null) {
	            return null;
	        }

	        if ("CANCELLED".equalsIgnoreCase(order.getOrderStatus())) {
	            return order;
	        }

	        order.setOrderStatus("CANCELLED");

	        Product product = productrepo.findById(order.getProductId()).orElse(null);
	        if (product != null) {
	            product.setProd_quantity(product.getProd_quantity() + order.getQuantity());
	            productrepo.save(product);
	        }

	        return orderdatarepo.save(order);
	    }
	}
  