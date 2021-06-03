package com.todoapp.rest.webservices.restfulwebservices.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.todoapp.rest.webservices.restfulwebservices.core.Todo;
import com.todoapp.rest.webservices.restfulwebservices.core.User;

public interface TodoRepository extends CrudRepository<Todo, Long>
{
	public List<Todo> findByUser(User user);
}
