import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  password: string; // Password for validation
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<string>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;  // Error message for failed login/register
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if there's a saved users list in localStorage when app loads
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      console.log('Loaded users from localStorage:', savedUsers);
    } else {
      console.log('No users found in localStorage');
    }
  }, []);

  // Helper to get all users from localStorage
  const getUsers = () => {
    const usersData = localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : [];
  };

  // Helper to save all users to localStorage
  const saveUsers = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Retrieve all users from localStorage
    const users = getUsers();
    const userData = users.find((user: User) => user.email === email);

    if (userData && userData.password === password) {
      setUser(userData); // Successful login
      setError(null); // Clear any previous errors
      console.log('User logged in:', userData);
      return true;
    } else {
      setError('Invalid email or password.');
      console.log('Login failed: Invalid credentials');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<string> => {
    // Retrieve all users from localStorage
    const users = getUsers();

    // Check if the user already exists
    const existingUser = users.find((user: User) => user.email === email);
    if (existingUser) {
      setError('User already exists with this email.');
      console.log('Registration failed: User already exists');
      return 'User already exists with this email.';
    }

    // Register new user and add to the list
    const newUser: User = { email, name, password };
    users.push(newUser);

    // Save updated users list to localStorage
    saveUsers(users);

    setUser(newUser); // Log the user in immediately after registration
    setError(null); // Clear error
    console.log('User registered:', newUser);
    return 'Registration successful!';
  };

  const logout = () => {
    setUser(null);  // Clear state
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
