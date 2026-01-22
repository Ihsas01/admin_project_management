import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hydrateAuth } from './store/authSlice';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import ProjectManagementPage from './pages/ProjectManagementPage';
import Layout from './components/Layout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Hydrate auth state from localStorage on app load
    dispatch(hydrateAuth());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Admin only routes */}
          <Route path="/users" element={<UserManagementPage />} />
          
          {/* All authenticated users */}
          <Route path="/projects" element={<ProjectManagementPage />} />
        </Route>
        
        {/* Redirect unknown routes to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;