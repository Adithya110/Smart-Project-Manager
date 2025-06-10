import { useEffect, useState } from 'react';
import api from '../services/api';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks on component mount
    api.get('/tasks').then(res => setTasks(res.data));

    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe('/topic/tasks', () => {
          api.get('/tasks').then(res => setTasks(res.data));
        });
      }
    });

    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
    };
  }, []); // Dependency array

  return (
    <div>
      <h2>Your Tasks</h2>
      {tasks.map(task => (
        <div key={task.id}>
          <strong>{task.title}</strong> - {task.status}
        </div>
      ))}
    </div>
  );
}
