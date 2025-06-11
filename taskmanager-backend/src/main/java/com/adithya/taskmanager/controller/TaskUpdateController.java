package com.adithya.taskmanager.controller;

import com.adithya.taskmanager.dto.TaskUpdateMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TaskUpdateController {

    // Client sends message to /app/task/update
    // Server broadcasts updated task to /topic/task
    @MessageMapping("/task/update")
    @SendTo("/topic/task")
    public TaskUpdateMessage sendTaskUpdate(TaskUpdateMessage task) throws Exception {
        
        return task;
    }
}
