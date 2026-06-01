package com.spring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LoginRegi {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long login_id;
	@Column(length =100)
	private String email;
	@Column(length =100)
	private String username;
	@Column(length =100)
	private String password;
	@Column(length =100)
	private long mobile_no;
	
	@Column(length =10)
	private String status;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Long getLogin_id() {
		return login_id;
	}
	public void setLogin_id(Long login_id) {
		this.login_id = login_id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public long getMobile_no() {
		return mobile_no;
	}
	public void setMobile_no(long mobile_no) {
		this.mobile_no = mobile_no;
	}
	@Override
	public String toString() {
		return "LoginRegi [login_id=" + login_id + ", email=" + email + ", username=" + username + ", password="
				+ password + ", mobile_no=" + mobile_no + ", status=" + status + "]";
	}
	
}