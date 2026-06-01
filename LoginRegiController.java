package com.spring.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.entity.LoginRegi;
import com.spring.repo.LoginRegiRepo;

@RestController
@CrossOrigin("*")
public class LoginRegiController {

    private final ProductController productController;
	
	@Autowired
	private LoginRegiRepo regiRepo;

    LoginRegiController(ProductController productController) {
        this.productController = productController;
    }

	@PostMapping("/register")
	public LoginRegi register(@RequestBody  LoginRegi loginregi ) {
		loginregi.setStatus("USER");
//		loginregi.setStatus("ADMIN");
		System.out.println("Register:"+loginregi);
		return regiRepo.save(loginregi);
	}
	
	@PostMapping("/login")
	public LoginRegi login(@RequestBody LoginRegi loginregi) {
		System.out.println("login...."+loginregi);
		Optional<LoginRegi> optLogin=regiRepo.findByEmail(loginregi.getEmail());
		if(optLogin.isPresent()) {
			if(loginregi.getPassword().equals(optLogin.get().getPassword())) {
				return optLogin.get();
			}
		}
		return loginregi;
		
	}
	
	
	@GetMapping("/getUserNameByEmail/{email}")
	public String getUserNameByEmail(@PathVariable String email) {
	    return regiRepo.findByEmail(email)
	                   .map(LoginRegi::getUsername)
	                   .orElse(null);
	}

	}
	
	

