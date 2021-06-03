package com.todoapp.rest.webservices.restfulwebservices.repository;

import org.springframework.data.repository.CrudRepository;

import com.todoapp.rest.webservices.restfulwebservices.core.User;

public interface UserRepository extends CrudRepository<User, Long>
{
	public User findByUsername(String username);
}
