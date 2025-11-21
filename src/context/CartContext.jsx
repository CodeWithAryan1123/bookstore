import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      // Load guest cart/wishlist
      const savedCart = localStorage.getItem('guestCart');
      const savedWishlist = localStorage.getItem('guestWishlist');
      
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    }
  }, [user]);

  const loadUserData = () => {
    if (!user) return;

    // Load user-specific cart
    const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
    const userCart = allCarts[user.id] || [];
    setCartItems(userCart);

    // Load user-specific wishlist
    const allWishlists = JSON.parse(localStorage.getItem('userWishlists') || '{}');
    const userWishlist = allWishlists[user.id] || [];
    setWishlist(userWishlist);
  };

  useEffect(() => {
    // Save cart whenever it changes
    if (user) {
      const allCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
      allCarts[user.id] = cartItems;
      localStorage.setItem('userCarts', JSON.stringify(allCarts));
    } else {
      localStorage.setItem('guestCart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  useEffect(() => {
    // Save wishlist whenever it changes
    if (user) {
      const allWishlists = JSON.parse(localStorage.getItem('userWishlists') || '{}');
      allWishlists[user.id] = wishlist;
      localStorage.setItem('userWishlists', JSON.stringify(allWishlists));
    } else {
      localStorage.setItem('guestWishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToCart = (book, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { ...book, quantity }];
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToWishlist = (book) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === book.id)) {
        return prev;
      }
      return [...prev, book];
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(prev => prev.filter(item => item.id !== bookId));
  };

  const isInWishlist = (bookId) => {
    return wishlist.some(item => item.id === bookId);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    cart: cartItems, // alias for consistency
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getCartTotal,
    cartTotal: getCartTotal(), // computed value
    getCartCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
