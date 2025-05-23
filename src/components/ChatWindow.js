import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';


const ChatWindow = () => {
    //const { username, messages, socket } = useContext(AppContext);

    const { username, socket } = useContext(AppContext);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you today?" },
        { id: 2, text: "I have a question about my order." }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        socket.on('loadMessages', (loadedMessages) => {
            setMessages(loadedMessages);
        });
        // Listen for new messages
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        // Listen for typing indicator
        socket.on('typing', (user) => {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 2000); // Hide after 2 seconds
        });

        socket.on('messageDeleted', (messageId) => { 
            socket.emit('requestMessages'); // alternatively, handle in App upon 'messageDeleted'
        });

        return () => {
            socket.off('loadMessages');
            socket.off('message');
            socket.off('typing');
            socket.off('messageDeleted');
        };
    }, [socket]);

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const newMessage = { text: inputValue, user: username, timestamp: new Date()};
            socket.emit('message', newMessage);
            setInputValue('');
        }
    };

    const handleTyping = () => {
        socket.emit('typing', username);
    };

    const handleDeleteMessage = (id) => {
        socket.emit('deleteMessage', id);
        const updatedMessages = messages.filter(message => message.id !== id);
        setMessages(updatedMessages); //main operation for deleting messages.
    };

    return (
        <div className="chat-window">
            <h2>Chat Window</h2>
            <div className="chat-messages">
                {messages.map(message => (
                    <div key={message.id} className="message">
                        <strong></strong> {message.text}{' '}
                        <button onClick={() => handleDeleteMessage(message.id)} className="delete-button">Delete</button>
                    </div>
                ))}
                {isTyping && <div className="typing-indicator">{username} is typing...</div>}
            </div>
            <div className="chat-input">
                <input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={inputValue} 
                    onChange={(e) => {setInputValue(e.target.value); handleTyping();}}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatWindow;

