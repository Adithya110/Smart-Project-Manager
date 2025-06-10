import { useEffect, useState } from 'react';
import api from '../services/api';
import '../css/TaskForm.css';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TaskForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract projectId, projectTitle, and possibly task for editing from location.state
  const { projectId, projectTitle, task } = location.state || {};

  // Form state: if editing, initialize with existing task data, else empty/defaults
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [status, setStatus] = useState(task ? task.status : 'Pending');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');
  const [users, setUsers] = useState([]);
  const [assignedUserId, setAssignedUserId] = useState(task && task.assignedTo ? task.assignedTo.id : '');

  // Redirect to dashboard if projectId missing
  useEffect(() => {
    if (!projectId) {
      alert("Project not found. Redirecting to dashboard.");
      navigate('/dashboard');
    }
  }, [projectId, navigate]);

  // Fetch users to assign task to
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handler for create or update
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (task ) {
        // UPDATE existing task (PUT or PATCH)
        await api.put(
          `/tasks/${projectId}`,  // Assuming this is your update endpoint
          {
            title,
            description,
            status,
            dueDate,
            assignedTo: assignedUserId ? { id: assignedUserId } : null
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        alert("Task updated successfully!");
      } else {
        // CREATE new task
        await api.post(
          `/tasks/project/${projectId}`,
          {
            title,
            description,
            status,
            dueDate,
            assignedTo: assignedUserId ? { id: assignedUserId } : null
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        alert("Task created successfully!");
      }

      // After success, reset form and navigate back to dashboard or project details
      setTitle('');
      setDescription('');
      setStatus('Pending');
      setDueDate('');
      setAssignedUserId('');
      navigate('/dashboard');  // or navigate back to the project details page if you prefer

    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task');
    }
  };

  return (
    <div className='task-form-container'>
      <h3>
        {task ? 'Update Task' : 'Create New Task'} for <span style={{ color: '#0077cc' }}>{projectTitle}</span>
      </h3>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />

      <input
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      />

      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />

      <select value={assignedUserId} onChange={e => setAssignedUserId(e.target.value)}>
        <option value="">-- Assign To --</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>
        {task ? 'Update Task' : 'Add Task'}
      </button>
    </div>
  );
}
