package com.todoapp.rest.webservices.restfulwebservices.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todoapp.rest.webservices.restfulwebservices.core.Todo;
import com.todoapp.rest.webservices.restfulwebservices.repository.TodoRepository;
import com.todoapp.rest.webservices.restfulwebservices.service.TodoService;

@Service
public class TodoServiceImpl implements TodoService
{
	private static final Logger logger = LoggerFactory.getLogger(TodoServiceImpl.class);
	
	@Autowired
	private TodoRepository todoRepository;

	@Override
	public Todo createTodo(Todo todo) {
		logger.info("Creating todo..");
		return todoRepository.save(todo);
	}

	@Override
	public Todo getTodo(Long todoId) {
		Optional<Todo> todo = todoRepository.findById(todoId);
		if(todo.isPresent()) {
			return todo.get();
		}
		return null;
	}

	@Override
	public void deleteTodo(Long todoId) {
		todoRepository.deleteById(todoId);
		logger.info("Todo with ID =>" + todoId + "is deleted");
	}

	@Override
	public Todo updateTodo(Todo todo) {
		todoRepository.deleteById(todo.getId());
		return createTodo(todo);
	}

}
