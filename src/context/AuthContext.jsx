import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    const loginTime = localStorage.getItem('loginTime');
    
    if (storedUser && loginTime) {
      const now = Date.now();
      const elapsed = now - parseInt(loginTime, 10);
      
      if (elapsed < SESSION_DURATION) {
        setUser(JSON.parse(storedUser));
        // Set timeout for remaining session time
        const remainingTime = SESSION_DURATION - elapsed;
        setTimeout(() => {
          handleSessionExpiry();
        }, remainingTime);
      } else {
        // Session expired
        handleSessionExpiry();
      }
    }
    setLoading(false);
  }, []);
  
  const handleSessionExpiry = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
    // Show notification
    if (window.showToast) {
      window.showToast('Session expired. Please log in again.', 'info');
    }
  };

  const signup = (userData) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Invalid credentials'); // Generic error message
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString(),
      orders: []
    };

    // Save to users list
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Log in the user
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('loginTime', Date.now().toString());

    return userWithoutPassword;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid credentials'); // Generic error message
    }

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    
    // Merge guest cart with user cart
    mergeGuestCart(userWithoutPassword.id);
    
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    localStorage.setItem('loginTime', Date.now().toString());

    return userWithoutPassword;
  };
  
  const mergeGuestCart = (userId) => {
    // Get guest cart
    const guestCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const guestWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (guestCart.length === 0 && guestWishlist.length === 0) {
      return; // Nothing to merge
    }
    
    // Get user cart
    const userCart = JSON.parse(localStorage.getItem(`cart_${userId}`) || '[]');
    const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`) || '[]');
    
    // Merge carts - if item exists, add quantities, otherwise add item
    const mergedCart = [...userCart];
    guestCart.forEach(guestItem => {
      const existingItem = mergedCart.find(item => item.id === guestItem.id);
      if (existingItem) {
        // Add quantities, but respect max limit
        const MAX_QUANTITY = 10;
        existingItem.quantity = Math.min(
          existingItem.quantity + guestItem.quantity,
          MAX_QUANTITY
        );
      } else {
        mergedCart.push(guestItem);
      }
    });
    
    // Merge wishlists - avoid duplicates
    const mergedWishlist = [...userWishlist];
    guestWishlist.forEach(guestItem => {
      if (!mergedWishlist.find(item => item.id === guestItem.id)) {
        mergedWishlist.push(guestItem);
      }
    });
    
    // Save merged data
    localStorage.setItem(`cart_${userId}`, JSON.stringify(mergedCart));
    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(mergedWishlist));
    
    // Clear guest cart and wishlist
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Update in users list
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
