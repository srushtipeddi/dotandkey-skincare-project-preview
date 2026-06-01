package com.spring.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Optional;
import com.spring.repo.LoginRegiRepo;
import com.spring.repo.ProductRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
//Add these import statements at the top with your other imports
	import org.springframework.web.bind.annotation.PutMapping;
	import org.springframework.web.bind.annotation.DeleteMapping;

import com.spring.ProductCart_Info;
import com.spring.entity.Cart;
import com.spring.entity.Product;
import com.spring.repo.CartRepo;

@RestController
@CrossOrigin("*")
public class CartController {

    private final LoginRegiRepo loginRegiRepo;

    private final LoginRegiController loginRegiController;
	
	@Autowired
	private CartRepo cartrepo;
	
	@Autowired
	private ProductRepo productrepo;


    CartController(LoginRegiController loginRegiController, LoginRegiRepo loginRegiRepo) {
        this.loginRegiController = loginRegiController;
        this.loginRegiRepo = loginRegiRepo;
    }
	

	@PostMapping("/addToCart")
	public Cart addToCart(@RequestBody Cart cart) {
		System.out.println(cart);
		Optional<Cart> optCart=cartrepo.findByProduct_idAndUser_email(cart.getProduct_id(), cart.getUser_email());
		System.out.println(optCart.isPresent());
		if(optCart.isPresent()) {
			Cart cartdata= optCart.get();
			cartdata.setProduct_quantity(cartdata.getProduct_quantity()+1);
			return cartrepo.save(cartdata);
		}else {
			return cartrepo.save(cart);
		}	
	}
	
	@GetMapping("/cart-info/{email}")
	public List<ProductCart_Info> getMethodName(@PathVariable String email){
		System.out.println("Email received: " +email);
       List<Cart> listCart=cartrepo.findByUser_email(email);
       System.out.println("Found " + listCart.size() + " cart items");
       List<ProductCart_Info> infos=new ArrayList<>();
       for(Cart cart:listCart) {
    	   ProductCart_Info info= new ProductCart_Info();
	   System.out.println(cart);
       Product prod=productrepo.findById(cart.getProduct_id()).orElse(new Product());
       info.setCart_id(cart.getCart_id());
       info.setProduct_quantity(cart.getProduct_quantity());
       info.setProduct_id(cart.getProduct_id());
       info.setUser_email(cart.getUser_email());
       
       info.setProd_category(prod.getProd_category());
       info.setProd_img1(prod.getProd_img1());
       info.setProd_img2(prod.getProd_img2());
       info.setProd_img3(prod.getProd_img3());
       info.setProd_img4(prod.getProd_img4());
       
       info.setProd_name(prod.getProd_name());
       info.setProd_price(prod.getProd_price());
       info.setProd_quantity(prod.getProd_quantity());
       info.setStatus(prod.getStatus());
       
       infos.add(info);
       
 }
       return infos;
	}
	

	@PutMapping("/update-cart-quantity")
	public Cart updateCartQuantity(@RequestBody Cart cart) {
	    Optional<Cart> optCart = cartrepo.findById(cart.getCart_id());
	    if(optCart.isPresent()) {
	        Cart existingCart = optCart.get();
	        existingCart.setProduct_quantity(cart.getProduct_quantity());
	        return cartrepo.save(existingCart);
	    }
	    return null;
	}
	
	@DeleteMapping("/remove-cart-item/{cartId}")
	public Map<String, Object> removeCartItem(@PathVariable Long cartId) {
	    Map<String, Object> response = new HashMap<>();
	    
	    try {
	        cartrepo.deleteById(cartId);
	        response.put("success", true);
	        response.put("message", "Item removed successfully");
	    } catch (Exception e) {
	        response.put("success", false);
	        response.put("message", "Failed to remove item");
	    }
	    
	    return response;
	}
}


