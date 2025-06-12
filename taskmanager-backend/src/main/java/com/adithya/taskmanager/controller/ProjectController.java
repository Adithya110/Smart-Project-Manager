package com.adithya.taskmanager.controller;

import com.adithya.taskmanager.model.Project;
import com.adithya.taskmanager.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    //  Create new project
    @PostMapping
    public ResponseEntity<?> createProject(@RequestBody Project project) {
        if (project.getTitle() == null || project.getTitle().trim().isEmpty()) {
        return ResponseEntity.badRequest().body("Title cannot be empty");
    }

        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
    }

    //  Get all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
    if (!projectRepository.existsById(id)) {
        return ResponseEntity.notFound().build();
    }
    projectRepository.deleteById(id);
    return ResponseEntity.ok("Project deleted successfully");
    }

    //  Get project by ID
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
