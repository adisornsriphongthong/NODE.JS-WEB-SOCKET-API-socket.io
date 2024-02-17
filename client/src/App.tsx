import { io, Socket } from 'socket.io-client';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const socket: Socket = io('http://localhost:3001/'); // Initialize the socket connection

  useEffect(() => {
    const receiveMessage = (receivedMessage: string) => {
      setReceivedMessage(receivedMessage);
    };

    socket.on('receive_message', receiveMessage);

    return () => {
      socket.off('receive_message', receiveMessage);
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      // Emit the message to the server
      socket.emit('send_message', message);
      setMessage(''); // Clear the input field after sending the message
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send Message</button>
      <p>Received Message: {receivedMessage}</p>
    </div>
  );
}

export default App;
