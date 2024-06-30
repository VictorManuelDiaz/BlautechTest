package com.todo_api.core.infrastructure.repository;

import com.todo_api.core.domain.models.User;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long>{

}
