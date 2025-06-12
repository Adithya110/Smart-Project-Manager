import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/CreateProject.css';

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:8080/api/projects',
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      alert('Project created successfully!')
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="create-project-container">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit} className="create-project-form">
        <label>
          Project Title:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            placeholder="Enter project title"
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter project description"
            rows="4"
          />
        </label>

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

