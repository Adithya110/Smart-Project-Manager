import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ProjectDetail.css';
import { useNavigate } from 'react-router-dom';

export default function ProjectDetails() {
  const { id } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      try {
        const token = localStorage.getItem('token');

        const [projectRes, tasksRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`http://localhost:8080/api/tasks/project/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setProject(projectRes.data);
        setTasks(tasksRes.data);
      } catch (error) {
        console.error('Error loading project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndTasks();
  }, [id]);

  if (loading) return <p>Loading project details...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div className="project-details-container">
      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <h3>Tasks:</h3>
      {tasks.length === 0 ? (
        <p>No tasks found for this project.</p>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="task-card">
              <strong>{task.title}</strong>: {task.description}
              <p>Status: {task.status}</p>
              <p>Due Date: {task.dueDate}</p>
              <p>Assigned To: {task.assignedTo ? task.assignedTo.username : 'Unassigned'}</p>
              <button onClick={() => {navigate('/create-task', { state: { projectId: project.id, projectTitle: project.title, task } })
              console.log(task)}} >Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
