export type Product = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  discount?: number
  sold?: number
  isHot?: boolean
  freeGifts?: string[]
  category: string
  specs?: string[]
  frameUrl?: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface UserProfile {
  id: string
  name: string
  email: string
  role: string
}
