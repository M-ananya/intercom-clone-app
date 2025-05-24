import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';

const Settings = () => {
  const { username, setUsername } = useContext(AppContext);
  const [newName, setNewName] = useState(username || '');
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize from localStorage or default false
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleNameChange = () => {
    if (newName.trim() !== '') {
      setUsername(newName.trim());
      alert(`Username changed to ${newName}`);
    }
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="setting-item">
        <label>Change Username:</label>
        <input 
          type="text" 
          value={newName} 
          onChange={e => setNewName(e.target.value)} 
          placeholder="Enter new username" 
        />
        <button onClick={handleNameChange}>Save</button>
      </div>

      <div className="setting-item">
        <label>Dark Mode:</label>
        <input 
          type="checkbox" 
          checked={darkMode} 
          onChange={e => setDarkMode(e.target.checked)} 
        />
      </div>

      <div className="setting-item">
        <h3>User Info</h3>
        <p><strong>Username:</strong> {username}</p>
        <p>Member since: January 2023</p>
        <p>Email notifications: Enabled</p>
      </div>
    </div>
  );
};

export default Settings;



// import React from 'react';

// const Settings = () => {
//     return (
//         <div>
//             <h2>Settings</h2>
//             <p>Adjust your settings here.</p>
//         </div>
//     );
// };

// export default Settings;
