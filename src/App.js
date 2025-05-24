import React, { useState, useEffect, createContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Dashboard from './components/Dashboard';
import Messages from './components/Messages';
import Settings from './components/Settings';
import Login from './components/Login';
import Footer from './components/Footer';
import './styles.css';

export const AppContext = createContext();
const socket = io('http://localhost:4000');

function App() {
    const [username, setUsername] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
    // Load initial messages from server on connect
    socket.on('loadMessages', (loadedMessages) => {
      setMessages(loadedMessages);
    });
    // Listen for new messages from server
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socket.on('messageDeleted', (deletedId) => {
      console.log('Message deleted:', deletedId);
      setMessages((prev) => prev.filter((msg) => msg.id !== deletedId));
    });

    // socket.on('messageDeleted', (messageId) => {
    //   setMessages(prev => prev.filter(msg => msg.id !== messageId));
    // });

    return () => {
      socket.off('loadMessages');
      socket.off('message');
      socket.off('messageDeleted');
    };
  }, []);
    if (!username) {
    // Not logged in, show Login page with setter
    return <Login onLogin={setUsername} />;
  }   
    return (
        <AppContext.Provider value={{ socket, username, setUsername, messages, setMessages}}>
            <Router>
                <div className="app">
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <Routes>
                            <Route path="/chat" element={username ? <ChatWindow username={username} /> : <Login onLogin={setUsername} />} />
                            <Route path="/messages" element={username ? <Messages /> : <Login onLogin={setUsername} />} />
                            <Route path="/settings" element={username ? <Settings /> : <Login onLogin={setUsername} />} />
                            <Route path="/dashboard" element={username ? <Dashboard /> : <Login onLogin={setUsername} />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </AppContext.Provider>
    );
}

export default App;

