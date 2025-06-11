// TaskUpdateListener.jsx
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { connectToWebSocket, disconnectWebSocket } from '../WebSocketClient';

const TaskUpdateListener = () => {
  useEffect(() => {
    connectToWebSocket((message) => {
      toast.info(
        `🔄 Task Updated: "${message.title}"\nStatus: ${message.status}${
          message.assignedTo ? ` | Assigned to: ${message.assignedTo}` : ''
        }`
      );
      console.log("Received task update message:", message);
    });

    return () => {
      disconnectWebSocket();
    };
  }, []);

  return null;
};

export default TaskUpdateListener;
