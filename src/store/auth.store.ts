import { create } from 'zustand'
import type { UserProfile } from '~/types'

interface AuthState {
  isAuthenticated: boolean
  user: UserProfile | null
}

interface AuthActions {
  login: (userData: UserProfile) => void
  logout: () => void
}

export type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null })
}))
