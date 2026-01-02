"use client"

import useSWR from "swr"
import { useEffect } from "react"

const WISHLIST_KEY = "shopz-wishlist"

export function useWishlist() {
  const { data: wishlist = [], mutate } = useSWR<number[]>(WISHLIST_KEY, null, {
    fallbackData: [],
  })

  useEffect(() => {
    const saved = localStorage.getItem(WISHLIST_KEY)
    if (saved) {
      try {
        mutate(JSON.parse(saved), false)
      } catch (e) {
        console.error("[v0] Failed to parse wishlist from localStorage", e)
      }
    }
  }, [mutate])

  const toggleWishlist = (id: number) => {
    const newWishlist = wishlist.includes(id) ? wishlist.filter((item) => item !== id) : [...wishlist, id]

    mutate(newWishlist, false)
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist))
  }

  return { wishlist, toggleWishlist }
}
