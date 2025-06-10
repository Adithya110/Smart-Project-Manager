package com.adithya.taskmanager.service;

import com.adithya.taskmanager.model.Task;
import com.adithya.taskmanager.repository.TaskRepository;
import com.adithya.taskmanager.dto.TaskUpdateMessage;
import com.adithya.taskmanager.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public Task updateTask(Long taskId, Task updatedTask) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(updatedTask.getTitle());
        task.setStatus(updatedTask.getStatus());
        task.setAssignedTo(updatedTask.getAssignedTo());
        Task savedTask = taskRepository.save(task);
    User assignedUser=savedTask.getAssignedTo();
    String assignedToUsername=assignedUser!= null ?assignedUser.getUsername():null;
        // 🔔 Send WebSocket notification
        TaskUpdateMessage message = new TaskUpdateMessage(
            savedTask.getId(),
            savedTask.getTitle(),
            savedTask.getStatus(),
            assignedToUsername
        );
        messagingTemplate.convertAndSend("/topic/task-updates", message);

        return savedTask;
    }
}
