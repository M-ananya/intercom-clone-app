// import React, { useEffect, useState, useContext } from 'react';
// import { AppContext } from '../App';


// const ChatWindow = () => {
//     const { username, socket } = useContext(AppContext);
//     const [messages, setMessages] = useState([
//         { id: 1, text: "Hello! How can I help you today?" },
//         { id: 2, text: "I have a question about my order." }
//     ]);
//     const [inputValue, setInputValue] = useState('');
//     const [isTyping, setIsTyping] = useState(false);

//     useEffect(() => {
//         socket.on('loadMessages', (loadedMessages) => {
//             setMessages(loadedMessages);
//         });
//         // Listen for new messages
//         socket.on('message', (message) => {
//             setMessages((prevMessages) => [...prevMessages, message]);
//         });
//         // Listen for typing indicator
//         socket.on('typing', (user) => {
//             setIsTyping(true);
//             setTimeout(() => setIsTyping(false), 2000); // Hide after 2 seconds
//         });

//         socket.on('messageDeleted', (messageId) => { 
//             socket.emit('requestMessages'); // alternatively, handle in App upon 'messageDeleted'
//         });

//         return () => {
//             socket.off('loadMessages');
//             socket.off('message');
//             socket.off('typing');
//             socket.off('messageDeleted');
//         };
//     }, [socket]);

//     const handleSendMessage = () => {
//         if (inputValue.trim()) {
//             const newMessage = { text: inputValue, user: username, timestamp: new Date()};
//             socket.emit('message', newMessage);
//             setInputValue('');
//         }
//     };

//     const handleTyping = () => {
//         socket.emit('typing', username);
//     };

//     const handleDeleteMessage = (id) => {
//         socket.emit('deleteMessage', id);
//         const updatedMessages = messages.filter(message => message.id !== id);
//         setMessages(updatedMessages); //main operation for deleting messages.
//     };

//     return (
//         <div className="chat-window">
//             <h2>Chat Window</h2>
//             <div className="chat-messages">
//                 {messages.map(message => (
//                     <div key={message.id} className="message">
//                         <strong></strong> {message.text}{' '}
//                         <button onClick={() => handleDeleteMessage(message.id)} className="delete-button">Delete</button>
//                     </div>
//                 ))}
//                 {isTyping && <div className="typing-indicator">{username} is typing...</div>}
//             </div>
//             <div className="chat-input">
//                 <input 
//                     type="text" 
//                     placeholder="Type your message..." 
//                     value={inputValue} 
//                     onChange={(e) => {setInputValue(e.target.value); handleTyping();}}
//                 />
//                 <button onClick={handleSendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default ChatWindow;


// import React, { useEffect, useState, useContext } from 'react';
// import { AppContext } from '../App';


// const ChatWindow = () => {
//     const { username, socket } = useContext(AppContext);
//     const [messages, setMessages] = useState([
//         { id: 1, text: "Hello! How can I help you today?" },
//         { id: 2, text: "I have a question about my order." }
//     ]);
//     const [inputValue, setInputValue] = useState('');
//     const [isTyping, setIsTyping] = useState(false);

//     useEffect(() => {
//         socket.on('loadMessages', (loadedMessages) => {
//             setMessages(loadedMessages);
//         });
//         // Listen for new messages
//         socket.on('message', (message) => {
//             setMessages((prevMessages) => [...prevMessages, message]);
//         });
//         // Listen for typing indicator
//         socket.on('typing', (user) => {
//             setIsTyping(true);
//             setTimeout(() => setIsTyping(false), 2000); // Hide after 2 seconds
//         });

//         socket.on('messageDeleted', (messageId) => { 
//             socket.emit('requestMessages'); // alternatively, handle in App upon 'messageDeleted'
//         });

//         return () => {
//             socket.off('loadMessages');
//             socket.off('message');
//             socket.off('typing');
//             socket.off('messageDeleted');
//         };
//     }, [socket]);

//     const handleSendMessage = () => {
//         if (inputValue.trim()) {
//             const newMessage = { text: inputValue, user: username, timestamp: new Date()};
//             socket.emit('message', newMessage);
//             setInputValue('');
//         }
//     };

//     const handleTyping = () => {
//         socket.emit('typing', username);
//     };

//     const handleDeleteMessage = (id) => {
//         socket.emit('deleteMessage', id);
//         const updatedMessages = messages.filter(message => message.id !== id);
//         setMessages(updatedMessages); //main operation for deleting messages.
//     };

//     return (
//         <div className="chat-window">
//             <h2>Chat Window</h2>
//             <div className="chat-messages">
//                 {messages.map(msg => (
//                     <div key={msg.id} className="message">
//                         <strong></strong>{msg.text}{' '}
//                         <button onClick={() => handleDeleteMessage(msg.id)} className="delete-button">Delete</button>
//                     </div>
//                 ))}
//                 {isTyping && <div className="typing-indicator">{username} is typing...</div>}
//             </div>
//             <div className="chat-input">
//                 <input 
//                     type="text" 
//                     placeholder="Type your message..." 
//                     value={inputValue} 
//                     onChange={(e) => {setInputValue(e.target.value); handleTyping();}}
//                 />
//                 <button onClick={handleSendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default ChatWindow;

// import React, { useContext, useState } from 'react';
// import { AppContext } from '../App';

// const ChatWindow = () => {
//   const { messages, socket, username } = useContext(AppContext);
//   const [inputValue, setInputValue] = useState('');
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;
//     const newMessage = {
//       user: username,
//       text: inputValue,
//       timestamp: new Date(),
//     };
//     socket.emit('message', newMessage);
//     setInputValue('');
//   };

//   const handleTyping = () => {
//     socket.emit('typing', username);
//     setIsTyping('');
//   };

//   const handleDelete = (id) => {
//     socket.emit('deleteMessage', id);
//   };

//   return (
//     <div className="chat-window">
//       <h2>Chat Window</h2>
//       <div className="chat-messages">
//         {messages.map(msg => (
//           <div key={msg.id} className="message">
//             <strong>{msg.user}</strong>: {msg.text}{' '}
//             <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
//             <button onClick={() => handleDelete(msg.id)} className="delete-button">Delete</button>
//           </div>
//         ))}
//         {isTyping && <div className="typing-indicator">{username} is typing...</div>}
//       </div>
//       <div className="chat-input">
//         <input
//           placeholder="Type your message..."
//           value={inputValue}
//           onChange={e => { setInputValue(e.target.value); handleTyping(); }}
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;


import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';

const ChatWindow = () => {
  const { messages, socket, username, setMessages } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');

  // Listen for messageDeleted event and update messages state
  useEffect(() => {
    const onMessageDeleted = (deletedId) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== deletedId)
      );
    };
    socket.on('messageDeleted', onMessageDeleted);

    return () => {
      socket.off('messageDeleted', onMessageDeleted);
    };
  }, [socket, setMessages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      user: username,
      text: inputValue,
      timestamp: new Date(),
    };
    socket.emit('message', newMessage);
    setInputValue('');
  };

  const handleDelete = (id) => {
    if (!id) return;
    socket.emit('deleteMessage', id);
  };

  return (
    <div className="chat-window">
      <h2>Chat Window</h2>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.user}</strong>: {msg.text}{' '}
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
            <button
              onClick={() => handleDelete(msg.id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
