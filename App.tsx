import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import { useState, useEffect } from 'react';

function App() {
  // Simple auth state for demo purposes
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('omnicreate_auth');
    if (auth === 'true' || auth === 'owner' || auth === 'user') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
