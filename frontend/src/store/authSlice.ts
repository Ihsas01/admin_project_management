import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { decodeToken } from '../utils/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'STAFF';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      
      // Store token and user data in localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      
      // Remove token and user data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    hydrateAuth: (state) => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          state.token = token;
          state.user = user;
          state.isAuthenticated = true;
        } catch (error) {
          // Invalid user data, clear both
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else if (token) {
        // Token exists but no user data, try to decode token as fallback
        const decoded = decodeToken(token);
        if (decoded) {
          state.token = token;
          state.isAuthenticated = true;
          state.user = {
            id: decoded.userId,
            name: '',
            email: decoded.email,
            role: decoded.role
          };
        } else {
          // Invalid token, clear it
          localStorage.removeItem('token');
        }
      }
    },
  },
});

export const { setLoading, setUser, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;