import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: (userData) => set({ isAuthenticated: true, user: userData }),
      logout: () => set({ isAuthenticated: false, user: null })
    }),
    { name: 'tranphongpc-auth' }
  )
)
