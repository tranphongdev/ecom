import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { authAtom } from '../atoms';

/**
 * Wraps protected routes. Redirects unauthenticated users to /login,
 * preserving the intended destination in `state.from` so we can
 * redirect back after login.
 */
export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAtomValue(authAtom);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
