export type ProductStatus = 'active' | 'draft' | 'archived';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  image: string;
  category: string;
}

export type OrderStatus = 'pending' | 'shipping' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: OrderStatus;
  date: string;
  items: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  preferences: {
    emailNotifications: boolean;
    systemNotifications: boolean;
    darkMode: boolean;
  };
}

export interface LoginActivity {
  id: string;
  device: string;
  ip: string;
  location: string;
  time: string;
}

export type PageType = 'dashboard' | 'products' | 'orders' | 'customers' | 'analytics' | 'discounts' | 'settings' | 'profile';
