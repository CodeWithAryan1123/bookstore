import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      loadUserOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  const loadUserOrders = () => {
    if (!user) return;
    
    const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    const userOrders = allOrders[user.id] || [];
    setOrders(userOrders);
  };

  const createOrder = (orderData) => {
    if (!user) {
      throw new Error('User must be logged in to create an order');
    }

    const newOrder = {
      id: Date.now().toString(),
      userId: user.id,
      items: orderData.items,
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      shipping: orderData.shipping,
      discount: orderData.discount || 0,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress || {},
      paymentMethod: orderData.paymentMethod || 'COD',
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    // Save to localStorage
    const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    const userOrders = allOrders[user.id] || [];
    userOrders.unshift(newOrder); // Add to beginning
    allOrders[user.id] = userOrders;
    localStorage.setItem('orders', JSON.stringify(allOrders));

    // Update state
    setOrders(userOrders);

    return newOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId, status) => {
    if (!user) return;

    const allOrders = JSON.parse(localStorage.getItem('orders') || '{}');
    const userOrders = allOrders[user.id] || [];
    
    const updatedOrders = userOrders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );

    allOrders[user.id] = updatedOrders;
    localStorage.setItem('orders', JSON.stringify(allOrders));
    setOrders(updatedOrders);
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      totalSpent: orders.reduce((sum, o) => sum + o.total, 0)
    };
  };

  const value = {
    orders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    getOrderStats,
    loadUserOrders
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
