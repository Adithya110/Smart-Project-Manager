import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:8080/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  const handleDeleteProject = async (projectId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this project?");
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem('token');

    await axios.delete(`http://localhost:8080/api/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
    alert("Sucessfully Deleted");
  } catch (error) {
    console.error('Error deleting project:', error);
    alert('Failed to delete project.');
  }
};

  
  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleAddTask=(projectId,projectTitle) =>{
    navigate('/create-task',{state:{projectId,projectTitle}});
  }
  const handleCreateProject = () => {
    navigate('/create-project'); 
  };

  return (
    <div className="dashboard-container">
      <h2>📋 Project Dashboard</h2>
      
      {/* Create Project Button */}
      <button className="create-project-button" onClick={handleCreateProject}>
        + Create Project
      </button>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="dashboard-grid">
          {projects.map(project => (
            <div key={project.id} className="dashboard-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button onClick={() => handleViewProject(project.id)} className="view-button">View Project</button>
              <button onClick={()=>handleAddTask(project.id,project.title)} className="add-task-button">Add task</button>
              <button onClick={() => handleDeleteProject(project.id)} className="delete-button">Delete</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
