package com.todoapp.rest.webservices.restfulwebservices.service;

import com.todoapp.rest.webservices.restfulwebservices.core.Todos;
import com.todoapp.rest.webservices.restfulwebservices.core.User;

public interface UserService {
	
	public User createUser(User user);
	public Todos getTodos(User user);
	public void deleteUser(User user);
	public User updateUser(User user);
	public User findByUsername(String username);

}
