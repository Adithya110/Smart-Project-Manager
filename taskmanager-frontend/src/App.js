import React,{useState,useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProjectDetails from './components/ProjectDetails';
import CreateProject from './components/ProjectForm';
import TaskForm from './components/TaskForm';
import './App.css';
import TaskUpdateListener from './components/TaskUpdateListener';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
     useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
    const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href='/login';
  };



  return (
    <div className="app-container">
      <h1 className="app-title">Smart Project Manager</h1>
       {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )} 
      <TaskUpdateListener />
      <ToastContainer position="top-right" autoClose={4000} />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/create-task" element={<TaskForm />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/tasks" element={<TaskList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
