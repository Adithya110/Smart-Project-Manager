package com.adithya.taskmanager.repository;

import com.adithya.taskmanager.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    
}
