import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
}

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gradient-to-r from-indigo-700 to-purple-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Admin Dashboard
          </h1>
        </div>
        
        <div className="flex items-center justify-between w-full sm:w-auto">
          {user && (
            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-lg rounded-full px-4 py-2 shadow-inner">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-start">
                  <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-[100px]">{user.name}</p>
                  <p className="text-[10px] sm:text-xs text-indigo-200">{user.role}</p>
                </div>
                
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 focus:ring-offset-indigo-700 shadow-md"
              >
                <svg className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;