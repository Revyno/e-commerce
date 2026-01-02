"use client"

import useSWR from "swr"
import { useEffect } from "react"

export interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

const CART_KEY = "shopz-cart"

export function useCart() {
  const { data: cart = [], mutate } = useSWR<CartItem[]>(CART_KEY, null, {
    fallbackData: [],
  })

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY)
    if (saved) {
      try {
        mutate(JSON.parse(saved), false)
      } catch (e) {
        console.error("[v0] Failed to parse cart from localStorage", e)
      }
    }
  }, [mutate])

  const addToCart = (product: any) => {
    const currentCart = [...cart]
    const existingIndex = currentCart.findIndex((item) => item.id === product.id)

    if (existingIndex > -1) {
      currentCart[existingIndex].quantity += 1
    } else {
      currentCart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        quantity: 1,
      })
    }

    mutate(currentCart, false)
    localStorage.setItem(CART_KEY, JSON.stringify(currentCart))
  }

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id)
    mutate(newCart, false)
    localStorage.setItem(CART_KEY, JSON.stringify(newCart))
  }

  const updateQuantity = (id: number, quantity: number) => {
    const newCart = cart
      .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
      .filter((item) => item.quantity > 0)
    mutate(newCart, false)
    localStorage.setItem(CART_KEY, JSON.stringify(newCart))
  }

  const clearCart = () => {
    mutate([], false)
    localStorage.removeItem(CART_KEY)
  }

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart }
}
