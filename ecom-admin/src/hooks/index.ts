import { useState } from 'react';
import { Product, Order, Customer } from '../types';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Leather Backpack', price: 129.99, stock: 45, status: 'active', category: 'Accessories', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop&q=60' },
  { id: '2', name: 'Wireless Noise Cancelling Headphones', price: 299.99, stock: 12, status: 'active', category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60' },
  { id: '3', name: 'Minimalist Wall Clock', price: 39.50, stock: 0, status: 'archived', category: 'Home', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&auto=format&fit=crop&q=60' },
  { id: '4', name: 'Organic Cotton T-Shirt', price: 25.00, stock: 156, status: 'active', category: 'Apparel', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&auto=format&fit=crop&q=60' },
  { id: '5', name: 'Smart Fitness Tracker', price: 89.00, stock: 8, status: 'draft', category: 'Electronics', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&auto=format&fit=crop&q=60' },
  { id: '6', name: 'Portable Coffee Maker', price: 45.99, stock: 32, status: 'active', category: 'Kitchen', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop&q=60' },
  { id: '7', name: 'Geometric Desk Lamp', price: 65.00, stock: 21, status: 'active', category: 'Home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed657f9971?w=400&auto=format&fit=crop&q=60' },
  { id: '8', name: 'Leather Passport Holder', price: 35.00, stock: 88, status: 'active', category: 'Accessories', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=60' },
];

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-12345', customerName: 'Sarah Jenkins', total: 154.20, status: 'completed', date: '2024-03-22T10:30:00Z', items: 3 },
  { id: 'ORD-12346', customerName: 'Michael Chen', total: 89.00, status: 'shipping', date: '2024-03-22T14:15:00Z', items: 1 },
  { id: 'ORD-12347', customerName: 'Emma Watson', total: 432.50, status: 'pending', date: '2024-03-21T09:45:00Z', items: 5 },
  { id: 'ORD-12348', customerName: 'David Miller', total: 25.00, status: 'cancelled', date: '2024-03-21T16:20:00Z', items: 1 },
  { id: 'ORD-12349', customerName: 'Lisa Thompson', total: 210.75, status: 'completed', date: '2024-03-20T11:00:00Z', items: 2 },
  { id: 'ORD-12350', customerName: 'Robert Wilson', total: 145.00, status: 'completed', date: '2024-03-20T15:30:00Z', items: 2 },
];

const MOCK_CUSTOMERS: Customer[] = [
  { id: 'CUST-1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', ordersCount: 12, totalSpent: 2450.00, lastOrderDate: '2024-03-22' },
  { id: 'CUST-2', name: 'Michael Chen', email: 'm.chen@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael', ordersCount: 5, totalSpent: 890.50, lastOrderDate: '2024-03-22' },
  { id: 'CUST-3', name: 'Emma Watson', email: 'e.watson@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', ordersCount: 24, totalSpent: 12450.00, lastOrderDate: '2024-03-21' },
];

export const useProducts = () => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading] = useState(false);
  return { products, loading };
};

export const useOrders = () => {
  const [orders] = useState<Order[]>(MOCK_ORDERS);
  const [loading] = useState(false);
  return { orders, loading };
};

export const useCustomers = () => {
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [loading] = useState(false);
  return { customers, loading };
};
