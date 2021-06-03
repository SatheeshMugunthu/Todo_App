package com.todoapp.rest.webservices.restfulwebservices.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todoapp.rest.webservices.restfulwebservices.core.Todo;
import com.todoapp.rest.webservices.restfulwebservices.core.Todos;
import com.todoapp.rest.webservices.restfulwebservices.core.User;
import com.todoapp.rest.webservices.restfulwebservices.repository.TodoRepository;
import com.todoapp.rest.webservices.restfulwebservices.repository.UserRepository;
import com.todoapp.rest.webservices.restfulwebservices.service.UserService;

@Service
public class UserServiceImpl implements UserService
{
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private TodoRepository todoRepository;
	
	@Override
	public User createUser(User user) 
	{
		User localUser = userRepository.findByUsername(user.getUsername());
		if(localUser != null) {
			logger.info("User {} already Exits. Nothing can be done !", user.getUsername());
		}else {
			localUser = userRepository.save(user);
		}
		return localUser;
	}

	@Override
	public Todos getTodos(User user) {
		List<Todo> todos = todoRepository.findByUser(user);
		return new Todos(todos);
	}

	@Override
	public void deleteUser(User user) {
		userRepository.deleteById(user.getUserId());
	}

	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User updateUser(User user) {
		return userRepository.save(user);
	}

}
