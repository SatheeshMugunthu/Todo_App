package com.todoapp.rest.webservices.restfulwebservices.service;

import com.todoapp.rest.webservices.restfulwebservices.core.Todo;


public interface TodoService 
{
	public Todo createTodo(Todo todo);
	public Todo getTodo(Long todoId);
	public void deleteTodo(Long todoId);
	public Todo updateTodo(Todo todo);
}
