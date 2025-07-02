import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ROLES, PERMISSIONS } from '../data/roles';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  users: [],
  loginAttempts: 0,
  isLocked: false,
  lockUntil: null
};

// Sample users with authentication data
const sampleUsers = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@nursery.com',
    username: 'sarah.johnson',
    password: 'admin123', // In real app, this would be hashed
    phone: '+44 7123 456789',
    role: 'administrator',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    lastLogin: null,
    createdAt: '2023-09-01T09:00:00',
    rooms: ['All Rooms'],
    emergencyContact: 'Mark Johnson - +44 7987 654321',
    qualifications: 'Level 3 Early Years, BA Education',
    contractType: 'permanent',
    workingHours: 'full-time',
    startDate: '2023-01-01',
    address: '123 Main Street, London, UK'
  },
  {
    id: '2',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@nursery.com',
    username: 'emma.davis',
    password: 'manager123',
    phone: '+44 7234 567890',
    role: 'manager',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastLogin: null,
    createdAt: '2023-09-01T09:00:00',
    rooms: ['Rainbow Room', 'Sunshine Room'],
    emergencyContact: 'Tom Davis - +44 7876 543210',
    qualifications: 'Level 4 Early Years Leadership, NVQ Level 3',
    contractType: 'permanent',
    workingHours: 'full-time',
    startDate: '2023-02-01',
    address: '456 Oak Avenue, London, UK'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@nursery.com',
    username: 'michael.brown',
    password: 'staff123',
    phone: '+44 7345 678901',
    role: 'practitioner',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastLogin: null,
    createdAt: '2023-10-15T09:00:00',
    rooms: ['Stars Room'],
    emergencyContact: 'Lisa Brown - +44 7765 432109',
    qualifications: 'Level 3 Childcare, First Aid Certified',
    contractType: 'permanent',
    workingHours: 'part-time',
    startDate: '2023-10-15',
    address: '789 Pine Road, London, UK'
  },
  {
    id: '4',
    firstName: 'Lisa',
    lastName: 'Wilson',
    email: 'lisa.wilson@nursery.com',
    username: 'lisa.wilson',
    password: 'senco123',
    phone: '+44 7456 789012',
    role: 'senco',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    lastLogin: null,
    createdAt: '2023-11-01T09:00:00',
    rooms: ['All Rooms'],
    emergencyContact: 'James Wilson - +44 7654 321098',
    qualifications: 'SENCO Qualification, BA Special Needs Education',
    contractType: 'permanent',
    workingHours: 'full-time',
    startDate: '2023-11-01',
    address: '321 Elm Street, London, UK'
  }
];

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        loginAttempts: 0,
        isLocked: false,
        lockUntil: null
      };
    
    case 'LOGIN_FAILURE':
      const newAttempts = state.loginAttempts + 1;
      const isLocked = newAttempts >= 3;
      const lockUntil = isLocked ? new Date(Date.now() + 15 * 60 * 1000) : null; // 15 minutes
      
      return {
        ...state,
        loginAttempts: newAttempts,
        isLocked,
        lockUntil,
        isLoading: false
      };
    
    case 'RESET_ATTEMPTS':
      return {
        ...state,
        loginAttempts: 0,
        isLocked: false,
        lockUntil: null
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        )
      };
    
    case 'LOAD_USERS':
      return { ...state, users: action.payload };
    
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Load users data
    dispatch({ type: 'LOAD_USERS', payload: sampleUsers });
    
    // Check for existing session
    const storedUser = localStorage.getItem('eyfs_user');
    const storedToken = localStorage.getItem('eyfs_token');
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        // Verify user still exists and is active
        const currentUser = sampleUsers.find(u => u.id === user.id && u.status === 'active');
        if (currentUser) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: currentUser });
        } else {
          localStorage.removeItem('eyfs_user');
          localStorage.removeItem('eyfs_token');
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        localStorage.removeItem('eyfs_user');
        localStorage.removeItem('eyfs_token');
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (credentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Check if account is locked
    if (state.isLocked && state.lockUntil && new Date() < state.lockUntil) {
      const remainingTime = Math.ceil((state.lockUntil - new Date()) / 60000);
      throw new Error(`Account locked. Try again in ${remainingTime} minutes.`);
    }

    // Reset lock if time has passed
    if (state.isLocked && state.lockUntil && new Date() >= state.lockUntil) {
      dispatch({ type: 'RESET_ATTEMPTS' });
    }

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = sampleUsers.find(u => 
        (u.username === credentials.username || u.email === credentials.username) &&
        u.password === credentials.password &&
        u.status === 'active'
      );

      if (!user) {
        dispatch({ type: 'LOGIN_FAILURE' });
        throw new Error('Invalid username or password');
      }

      // Update last login
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      
      // Store session
      localStorage.setItem('eyfs_user', JSON.stringify(updatedUser));
      localStorage.setItem('eyfs_token', 'fake-jwt-token'); // In real app, this would be a proper JWT
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: updatedUser });
      return updatedUser;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('eyfs_user');
    localStorage.removeItem('eyfs_token');
    dispatch({ type: 'LOGOUT' });
  };

  const hasPermission = (permission) => {
    if (!state.user) return false;
    const role = ROLES[state.user.role.toUpperCase()];
    return role ? role.permissions.includes(permission) : false;
  };

  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => hasPermission(permission));
  };

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastLogin: null
    };
    dispatch({ type: 'ADD_USER', payload: newUser });
    return newUser;
  };

  const deleteUser = (userId) => {
    if (state.user?.id === userId) {
      throw new Error('Cannot delete your own account');
    }
    dispatch({ type: 'DELETE_USER', payload: userId });
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (!state.user) throw new Error('No user logged in');
    
    // Verify current password
    const user = sampleUsers.find(u => u.id === state.user.id);
    if (!user || user.password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }

    // In real app, this would call an API
    const updatedUser = { ...state.user, password: newPassword };
    updateUser(updatedUser);
    
    return true;
  };

  const resetPassword = async (userId, newPassword) => {
    if (!hasPermission(PERMISSIONS.USERS_EDIT)) {
      throw new Error('Insufficient permissions');
    }

    const user = state.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');

    const updatedUser = { ...user, password: newPassword };
    updateUser(updatedUser);
    
    return true;
  };

  const value = {
    ...state,
    login,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    updateUser,
    addUser,
    deleteUser,
    changePassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}