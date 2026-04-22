import React, { Suspense } from 'react';
import type { RouteObject } from 'react-router-dom';
import { PageLoader } from '../components/ui/PageLoader';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '../components/layout/AppLayout';

// ─── Lazy-loaded pages ───────────────────────────────────────────────────────
// React.lazy requires default exports. Each page re-exports as default.

const DashboardPage = React.lazy(() => import('../pages/Dashboard'));
const ProductsPage = React.lazy(() => import('../pages/Products'));
const OrdersPage = React.lazy(() => import('../pages/Orders'));
const CustomersPage = React.lazy(() => import('../pages/Customers'));
const AnalyticsPage = React.lazy(() => import('../pages/Analytics'));
const ProfilePage = React.lazy(() => import('../pages/profile/ProfilePage'));
const LoginPage = React.lazy(() => import('../pages/auth/LoginPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));

// ─── Suspense wrapper ────────────────────────────────────────────────────────

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

// ─── Route configuration ─────────────────────────────────────────────────────

export const routeConfig: RouteObject[] = [
  // Public routes (no layout)
  {
    path: '/login',
    element: (
      <Lazy>
        <LoginPage />
      </Lazy>
    ),
  },

  // Protected routes (with layout)
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: (
              <Lazy>
                <DashboardPage />
              </Lazy>
            ),
          },
          {
            path: 'products',
            element: (
              <Lazy>
                <ProductsPage />
              </Lazy>
            ),
          },
          {
            path: 'orders',
            element: (
              <Lazy>
                <OrdersPage />
              </Lazy>
            ),
          },
          {
            path: 'customers',
            element: (
              <Lazy>
                <CustomersPage />
              </Lazy>
            ),
          },
          {
            path: 'analytics',
            element: (
              <Lazy>
                <AnalyticsPage />
              </Lazy>
            ),
          },
          {
            path: 'profile',
            element: (
              <Lazy>
                <ProfilePage />
              </Lazy>
            ),
          },
          {
            path: 'settings',
            element: (
              <Lazy>
                <DashboardPage />
              </Lazy>
            ), // placeholder — swap when SettingsPage is ready
          },
          {
            path: 'discounts',
            element: (
              <Lazy>
                <DashboardPage />
              </Lazy>
            ), // placeholder — swap when DiscountsPage is ready
          },
        ],
      },
    ],
  },

  // Catch-all 404
  {
    path: '*',
    element: (
      <Lazy>
        <NotFoundPage />
      </Lazy>
    ),
  },
];
