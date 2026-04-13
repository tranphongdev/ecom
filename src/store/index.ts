import { create } from 'zustand'
import type { CartItem, UserProfile } from '../types'

interface AppState {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void

  isAuthenticated: boolean
  user: UserProfile | null
  login: (userData: UserProfile) => void
  logout: () => void
}

export const useStore = create<AppState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id)
      if (existing) {
        return { cart: state.cart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)) }
      }
      return { cart: [...state.cart, item] }
    }),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
  clearCart: () => set({ cart: [] }),

  // Auth Actions
  isAuthenticated: false,
  user: null,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null })
}))
