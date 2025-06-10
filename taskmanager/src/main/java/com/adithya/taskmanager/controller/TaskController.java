package com.adithya.taskmanager.controller;

import com.adithya.taskmanager.model.Project;
import com.adithya.taskmanager.model.Task;
import com.adithya.taskmanager.repository.ProjectRepository;
import com.adithya.taskmanager.repository.TaskRepository;
import com.adithya.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskService taskService;

    //  Create a task under a specific project
    @PostMapping("/project/{projectId}")
    public ResponseEntity<?> createTask(@PathVariable Long projectId, @RequestBody Task task) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project == null) {
            return ResponseEntity.badRequest().body("Project not found");
        }

        task.setProject(project);
        Task savedTask = taskRepository.save(task);
        return ResponseEntity.ok(savedTask);
    }

    //  Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    //  Get tasks for a specific project
    @GetMapping("/project/{projectId}")
    public List<Task> getTasksByProject(@PathVariable Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
    Task savedTask = taskService.updateTask(id, updatedTask);
    return ResponseEntity.ok(savedTask);
    }
}
