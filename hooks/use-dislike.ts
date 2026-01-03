"use client"

import useSWR from "swr"
import { useEffect } from "react"

const DISLIKE_KEY = "shopz-dislike"

export function useDislike() {
  const { data: dislikes = [], mutate } = useSWR<number[]>(DISLIKE_KEY, null, {
    fallbackData: [],
  })

  useEffect(() => {
    const saved = localStorage.getItem(DISLIKE_KEY)
    if (saved) {
      try {
        mutate(JSON.parse(saved), false)
      } catch (e) {
        console.error(" Failed to parse dislikes from localStorage", e)
      }
    }
  }, [mutate])

  const toggleDislike = (id: number) => {
    const newDislikes = dislikes.includes(id) ? dislikes.filter((item) => item !== id) : [...dislikes, id]

    mutate(newDislikes, false)
    localStorage.setItem(DISLIKE_KEY, JSON.stringify(newDislikes))
  }

  return { dislikes, toggleDislike }
}
