import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '~/types'

interface CartState {
  items: CartItem[]
}

interface CartActions {
  addItem: (item: CartItem) => void
  updateItemQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearItems: () => void
}

export type CartStore = CartState & CartActions

const MIN_QUANTITY = 1

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              )
            }
          }

          return { items: [...state.items, item] }
        }),

      updateItemQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(MIN_QUANTITY, quantity) } : i
          )
        })),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      clearItems: () => set({ items: [] })
    }),
    { name: 'tranphongpc-cart' }
  )
)
