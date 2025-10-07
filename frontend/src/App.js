import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import AddTransaction from './components/AddTransaction';
import Dashboard from './components/Dashboard';
import './styles.css';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleAddTransaction = () => setRefresh(!refresh);
  const handleLogin = () => setLoggedIn(true);

  return (
    <div className="App" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1>💰 Expense Tracker</h1>
      {!loggedIn ? (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <Register />
          <Login onLogin={handleLogin} />
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <AddTransaction onAdd={handleAddTransaction} />
          </div>
          <div style={{ flex: 2 }}>
            <Dashboard key={refresh} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
