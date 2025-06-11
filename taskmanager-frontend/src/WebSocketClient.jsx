// websocketClient.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

export const connectToWebSocket = (onMessageReceived) => {
  const token=localStorage.getItem('token');
  const socket = new SockJS('http://localhost:8080/ws-task');
  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      Authorization: `Bearer ${token}`
    },
    onConnect: () => {
      console.log('✅ WebSocket connected');
      stompClient.subscribe('/topic/task-updates', (message) => {
        const body = JSON.parse(message.body);
        onMessageReceived(body);
        
      });
      
    },
    onStompError: (frame) => {
      console.error('WebSocket error:', frame.headers['message']);
    },
    debug: (str) => console.log(str),
    reconnectDelay: 5000
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log('🔌 WebSocket disconnected');
  }
};
