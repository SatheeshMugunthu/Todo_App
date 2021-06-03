package com.todoapp.rest.webservices.restfulwebservices.core;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="Todos")
public class Todo {
	
	@Id
	@GeneratedValue
	private Long todoId;
	private String description;
	private Date targetDate;
	private boolean isDone;
	
	@ManyToOne
	@JsonIgnore
	private User user;
	
	protected Todo() {}
	
	public Todo(Long todoId) {
		super();
		this.todoId = todoId;
	}

	public Todo(Long todoId, String description, Date targetDate, boolean isDone) {
		super();
		this.todoId = todoId;
		this.description = description;
		this.targetDate = targetDate;
		this.isDone = isDone;
	}

	public Long getId() {
		return todoId;
	}

	public void setId(Long id) {
		this.todoId = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public Long getUserId() {
		return user.getUserId();
	}

	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}

	public Date getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	public boolean isDone() {
		return isDone;
	}

	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((todoId == null) ? 0 : todoId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Todo other = (Todo) obj;
		if (todoId == null) {
			if (other.todoId != null)
				return false;
		} else if (!todoId.equals(other.todoId))
			return false;
		return true;
	}
	
	@Override
	public String toString() {
		return "Todo [todoId=" + todoId +  ", description=" + description + ", targetDate="
				+ targetDate + ", isDone=" + isDone + "]";
	}

}
