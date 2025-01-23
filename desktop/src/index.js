// distributed_task_system/frontend/web/src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const taskSocket = new WebSocket('ws://localhost:5000');
    const chatSocket = new WebSocket('ws://localhost:5000');

    taskSocket.onmessage = (event) => {
      const task = JSON.parse(event.data);
      setTasks((prev) => [...prev, task]);
    };

    chatSocket.onmessage = (event) => {
      const chat = JSON.parse(event.data);
      setChats((prev) => [...prev, chat]);
    };

    return () => {
      taskSocket.close();
      chatSocket.close();
    };
  }, []);

  const handleSendMessage = () => {
    const chatSocket = new WebSocket('ws://localhost:5000');
    chatSocket.onopen = () => {
      chatSocket.send(JSON.stringify({
        username: 'User',
        message,
      }));
    };
    setMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task and Chat Manager</h1>
      </header>
      <div className="tabs">
        <input type="radio" id="tasks" name="tab" defaultChecked />
        <label htmlFor="tasks">Tasks</label>
        <input type="radio" id="chat" name="tab" />
        <label htmlFor="chat">Chat</label>
        <div className="tab-content" id="tasks-content">
          <h2>Tasks</h2>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task.title} - {task.description}</li>
            ))}
          </ul>
        </div>
        <div className="tab-content" id="chat-content">
          <h2>Chat</h2>
          <ul>
            {chats.map((chat, index) => (
              <li key={index}><strong>{chat.username}:</strong> {chat.message}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;