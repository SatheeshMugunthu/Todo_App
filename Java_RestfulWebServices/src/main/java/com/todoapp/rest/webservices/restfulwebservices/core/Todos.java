/**
 * 
 */
package com.todoapp.rest.webservices.restfulwebservices.core;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

/**
 * @author satheesh-zt267
 * 
 * A class to encapsulate List of Todos 
 */

public class Todos implements Iterable<Todo>{
	
	private List<Todo> todos = new ArrayList<>();
	
	@SuppressWarnings("unused")
	private Todos() {};
	
	public Todos(Todo...todos) {
		Collections.addAll(this.todos, todos);
	}
	
	public Todos(List<Todo> todos) {
		this.todos = new ArrayList<>(todos);
	}
	
	private Todos(Todos todos) {
		this.todos = new ArrayList<>(todos.todos);
	}

	public void setTodos(List<Todo> todos) {
		this.todos = todos;
	}
	
	public List<Todo> getTodos() {
		return todos;
	}
	
	public void add(Todo todo) {
		todos.add(todo);
	}
	
	public void remove(Todo todo) {
		todos.remove(todo);
	}
	
	public void remove(Long todoId) {
		Todo todo = findTodoById(todoId);
		if(todo != null) {
			remove(todo);
		}
	}

	private Todo findTodoById(Long todoId) {
		for(Todo todo : todos) {
			if(todo.getId().equals(todoId)) {
				return todo;
			}
		}
		return null;
	}
	
	public boolean isEmpty() {
		return todos.isEmpty();
	}
	
	public void clear() {
		todos.clear();
	}

	@Override
	public Iterator<Todo> iterator() {
		return todos.iterator();
	}
	
	public Todos cloneObject() {
		return new Todos(this);
	}

	

}
