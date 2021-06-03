package com.todoapp.rest.webservices.restfulwebservices.core;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.todoapp.rest.webservices.restfulwebservices.basic.auth.SecurityUtil;
import com.todoapp.rest.webservices.restfulwebservices.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping(path="/users/createUser")
	public ResponseEntity<String> createUser(@RequestBody User user) 
	{
		User isCurrentUser = userService.findByUsername(user.getUsername());
		if(isCurrentUser!=null) {
			return new ResponseEntity<String>(ErrorMsg.USER_ALREADY_EXISTS,HttpStatus.UNPROCESSABLE_ENTITY);
		}
		String password = user.getPassword();
		user.setPassword(SecurityUtil.passwordEncoder().encode(password));
		User createdUser = userService.createUser(user);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdUser.getUserId()).toUri();  //Location //Get current resource url  // /{id}
		return  ResponseEntity.created(uri).build();
	}
	
	@PutMapping(path="/users/{userName}")
	public ResponseEntity<User> updateUser(@RequestBody User userDetails, @PathVariable String userName) 
	{
		User currentUser = userService.findByUsername(userName);
		if(currentUser == null) {
			return ResponseEntity.notFound().build(); 
		}
		//TODO : validateUserDetails
		User updatedUser = userService.updateUser(userDetails);
		return new ResponseEntity<User>(updatedUser,HttpStatus.OK);
	}
	
	@DeleteMapping(path="/users/{userName}")
	public ResponseEntity<Void> deleteUser(@PathVariable String userName) 
	{
		User user = userService.findByUsername(userName);
		if(user == null) {
			return ResponseEntity.notFound().build(); 
		}
		userService.deleteUser(user);
		return ResponseEntity.noContent().build();
	}
}
