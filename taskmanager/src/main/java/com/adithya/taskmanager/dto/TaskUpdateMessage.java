package com.adithya.taskmanager.dto;

public class TaskUpdateMessage {
    private Long id;
    private String title;
    private String status;
    private String assignedTo;

    public TaskUpdateMessage() {}

    public TaskUpdateMessage(Long id, String title, String status, String assignedTo) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.assignedTo = assignedTo;
    }

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

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getAssignedTo() {
        return assignedTo;
    }
    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }
}
