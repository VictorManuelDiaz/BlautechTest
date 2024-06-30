package com.todo_api.core.domain.models;

import java.time.LocalDateTime;

import com.todo_api.core.domain.types.State;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_task")
public class Task {
    @Id
    @Column(name = "tbl_task_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 255)
    private String title;
    
    @Column(length = 500)
    private String description;
    
    @Enumerated(EnumType.ORDINAL)
    private State state;
    
    private LocalDateTime created_at;
    
    @ManyToOne
    @JoinColumn(name = "tbl_user_id", nullable = false)
    private User user;
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}