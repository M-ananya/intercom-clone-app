import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const Dashboard = () => {
  const { messages } = useContext(AppContext);

  // Show last 3 messages as preview
  const recentMessages = messages.slice(-3).reverse();

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="stats">
        <div className="stat-box">
          <h3>Total Messages</h3>
          <p>{messages.length}</p>
        </div>
        <div className="stat-box">
          <h3>Active Users</h3>
          <p>5</p> {/* Dummy data */}
        </div>
        <div className="stat-box">
          <h3>Pending Responses</h3>
          <p>2</p> {/* Dummy data */}
        </div>
      </div>

      <div className="recent-messages">
        <h3>Recent Messages</h3>
        {recentMessages.length === 0 && <p>No messages yet.</p>}
        <ul>
          {recentMessages.map(msg => (
            <li key={msg.id}>
              <strong>{msg.user}</strong>: {msg.text.length > 30 ? msg.text.substring(0, 30) + '...' : msg.text}
            </li>
          ))}
        </ul>
        <Link to="/messages" className="btn-link">View All Messages</Link>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <Link to="/chat" className="btn">Go to Chat</Link>
        <Link to="/settings" className="btn">Settings</Link>
      </div>
    </div>
  );
};

export default Dashboard;




// import React from 'react';

// const Dashboard = () => {
//     return (
//         <div>
//             <h2>Dashboard</h2>
//             <p>Welcome to the Dashboard!</p>
//         </div>
//     );
// };

// export default Dashboard;
