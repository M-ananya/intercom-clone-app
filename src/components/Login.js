import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');

    const handleLogin = () => {
        if (username.trim()) {
            onLogin(username);
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <input 
                type="text" 
                placeholder="Enter your name" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
