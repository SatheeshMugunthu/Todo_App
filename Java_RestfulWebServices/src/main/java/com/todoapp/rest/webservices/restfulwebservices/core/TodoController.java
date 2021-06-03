package com.todoapp.rest.webservices.restfulwebservices.core;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.todoapp.rest.webservices.restfulwebservices.service.TodoService;
import com.todoapp.rest.webservices.restfulwebservices.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {
	
	@Autowired
	private TodoService todoService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping(path="/users/{userName}/todos")
	public List<Todo> getAllTodos(@PathVariable String userName) 
	{
		User user = userService.findByUsername(userName);
		Todos todos =  userService.getTodos(user);
		return todos.getTodos();
	}
	
	@DeleteMapping(path="/users/{userName}/todos/{todoId}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String userName, @PathVariable Long todoId) 
	{
		User user = userService.findByUsername(userName);
		Todo todo = todoService.getTodo(todoId);
		if(todo == null) {
			return ResponseEntity.notFound().build(); 
		}
		if(todo.getUserId().equals(user.getUserId())) {
			todoService.deleteTodo(todoId);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.unprocessableEntity().build();
	}
	
	@PostMapping(path="/users/{userName}/todos")
	public ResponseEntity<Void> createTodo(@RequestBody Todo todo, @PathVariable String userName) 
	{
		User user = userService.findByUsername(userName);
		todo.setUser(user);
		Todo createdTodo = todoService.createTodo(todo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId()).toUri();  //Location //Get current resource url  // /{id}
		return  ResponseEntity.created(uri).build();
	}
	
	@PutMapping(path="/users/{userName}/todos/{todoId}")
	public ResponseEntity<Todo> updateTodo(@RequestBody Todo todo, @PathVariable String userName, 
			@PathVariable Long todoId) 
	{
		User user = userService.findByUsername(userName);
		Todo oldTodo = todoService.getTodo(todoId);
		if(oldTodo == null) {
			return ResponseEntity.notFound().build(); 
		}
		if(oldTodo.getUserId().equals(user.getUserId())) {
			todo.setUser(user);
			todo.setId(oldTodo.getId());
			populateTodoDetails(todo, oldTodo);
			Todo updatedTodo = todoService.updateTodo(todo);
			return new ResponseEntity<Todo>(updatedTodo,HttpStatus.OK);
		}
		return ResponseEntity.unprocessableEntity().build();
	}

	private void populateTodoDetails(Todo todo, Todo oldTodo) 
	{
		if(todo.getDescription() == null) {
			todo.setDescription(oldTodo.getDescription());
		}
		if(todo.getTargetDate() == null) {
			todo.setTargetDate(oldTodo.getTargetDate());
		}
	}

	@GetMapping(path="/users/{userName}/todos/{todoId}")
	public ResponseEntity<Todo> getTodo(@PathVariable String userName, @PathVariable Long todoId) 
	{
		User user = userService.findByUsername(userName);
		Todo todo = todoService.getTodo(todoId);
		if(todo == null) {
			return ResponseEntity.notFound().build(); 
		}
		if(todo.getUserId().equals(user.getUserId())) {
			return new ResponseEntity<Todo>(todo,HttpStatus.OK);
		}
		return ResponseEntity.unprocessableEntity().build();
	}
}
