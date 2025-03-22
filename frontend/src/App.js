import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [backendStatus, setBackendStatus] = useState(null);
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const checkBackendStatus = () => {
    setLoading(true);
    fetch('/api/health')
      .then(response => response.json())
      .then(data => {
        setBackendStatus(data.status);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error checking backend:', error);
        setBackendStatus('Error');
        setLoading(false);
      });
  };

  const checkDatabaseStatus = () => {
    setLoading(true);
    fetch('/api/db-status')
      .then(response => response.json())
      .then(data => {
        setDbStatus(data.status);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error checking database:', error);
        setDbStatus('Error');
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{message || 'Hello World'}</h1>
        
        <div>
          <button onClick={checkBackendStatus}>Check Backend</button>
          {loading ? <p>Checking...</p> : <p>Backend Status: {backendStatus}</p>}
        </div>

        <div>
          <button onClick={checkDatabaseStatus}>Check Database</button>
          {loading ? <p>Checking...</p> : <p>Database Status: {dbStatus}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
