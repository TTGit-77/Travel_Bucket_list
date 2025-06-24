import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
// import Home and Profile (to be created)

const isLoggedIn = () => !!localStorage.getItem('token');

const App = () => {
  const [auth, setAuth] = useState(isLoggedIn());

  useEffect(() => {
    const onStorage = () => setAuth(isLoggedIn());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <Router key={auth ? 'auth' : 'guest'}>
      <Routes>
        <Route path="/login" element={auth ? <Navigate to="/home" /> : <Login setAuth={setAuth} />} />
        <Route path="/signup" element={auth ? <Navigate to="/home" /> : <Signup />} />
        <Route path="/home" element={auth ? <Home setAuth={setAuth} /> : <Navigate to="/login" />} />
        <Route path="/profile" element={auth ? <Profile /> : <Navigate to="/login" />} />
        {/* Profile route will be added soon */}
        <Route path="*" element={<Navigate to={auth ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
