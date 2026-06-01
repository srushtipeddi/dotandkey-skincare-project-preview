package com.spring.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.entity.LoginRegi;
import java.util.List;
import java.util.Optional;


public interface LoginRegiRepo extends JpaRepository<LoginRegi,Long> {
	
	Optional<LoginRegi> findByEmail(String email);

}
