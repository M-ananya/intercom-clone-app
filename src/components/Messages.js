import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';

const Messages = () => {
    const {socket} = useContext(AppContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Load existing messages when the component mounts
        socket.on('loadMessages', (loadedMessages) => {
            setMessages(loadedMessages);
        });

        socket.on('messageDeleted', (messageId) => {
            setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
        });
        

        // Fetch messages from the backend
        fetch('http://localhost:4000/api/messages') // Adjust the URL as needed
            .then(response => response.json())
            .then(data => {
                console.log('Messages from backend:', data); // Log messages from backend
                setMessages(data); // Set messages state
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });

        return () => {
            socket.off('loadMessages');
            socket.off('messageDeleted');
        };
    }, [socket]);

    const handleDelete = (id) => {
        socket.emit('deleteMessage', id);
    };

    return (
        <div>
            <h2>Messages</h2>
            <div className="messages-list">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <strong>{message.user}</strong>: {message.text} <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                        <button onClick={() => handleDelete(message.id)} className="delete-button">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Messages;

