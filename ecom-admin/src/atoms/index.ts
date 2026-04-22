import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { UserProfile } from '../types';

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
}

/**
 * Persisted auth atom — survives page reloads via localStorage.
 * In production, replace with a proper token-based check.
 */
export const authAtom = atomWithStorage<AuthState>('auth', {
  isAuthenticated: true, // default true for dev — flip to false to test login flow
  user: {
    id: '1',
    name: 'Alex Taylor',
    email: 'alex.taylor@luxe.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    role: 'Store Manager',
  },
});

// ─── UI State ────────────────────────────────────────────────────────────────

export const sidebarCollapsedAtom = atom<boolean>(false);
export const searchQueryAtom = atom<string>('');

// ─── Profile ─────────────────────────────────────────────────────────────────

export const profileAtom = atom<UserProfile>({
  name: 'Alex Taylor',
  email: 'alex.taylor@luxe.com',
  phone: '+1 (555) 000-1234',
  address: '123 Luxury Ave, Design District, NY 10001',
  role: 'Store Manager',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  status: 'online',
  preferences: {
    emailNotifications: true,
    systemNotifications: true,
    darkMode: false,
  }
});
