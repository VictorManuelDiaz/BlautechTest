package com.todo_api.core.infrastructure.repository;

import com.todo_api.core.domain.models.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long>{
	List<Task> findByUserId(Long userId);
}
