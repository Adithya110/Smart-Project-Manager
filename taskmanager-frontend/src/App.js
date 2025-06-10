import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this!
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProjectDetails from './components/ProjectDetails';
import CreateProject from './components/ProjectForm';
import TaskForm from './components/TaskForm';
import './App.css'; 
import TaskUpdateListener from './components/TaskUpdateListener'; 

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Smart Project Manager</h1>

      {/* 👇 WebSocket listener for toast notifications */}
      <TaskUpdateListener />

      {/* 👇 Global Toast container */}
      <ToastContainer position="top-right" autoClose={4000} />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Create-Project" element={<CreateProject />} />
        <Route path="/Create-Task" element={<TaskForm />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </div>
  );
}

export default App;
