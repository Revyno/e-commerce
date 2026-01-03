"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"
import { Skeleton } from "./ui/skeleton"
import { useState } from "react"

interface ProductCardProps {
  product: {
    id: number
    title: string
    price: number
    discountPercentage: number
    rating: number
    thumbnail: string
    brand?: string
    tags?: string[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { wishlist, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()
  const isWishlisted = wishlist.includes(product.id)
  const [imageLoading, setImageLoading] = useState(true)

  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)

  return (
    <div className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary mb-4">
        {imageLoading && (
          <Skeleton className="absolute inset-0 rounded-xl" />
        )}
        <Image
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(product.id)
          }}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity ${
            isWishlisted ? "bg-primary text-white opacity-100" : "bg-white text-foreground"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
          <button
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)
            }}
            className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-lg hover:bg-primary/90"
          >
            Add to Cart
          </button>
        </div>
        {product.discountPercentage > 10 && (
          <Badge className="absolute top-3 left-3 bg-white text-primary hover:bg-white" variant="secondary">
            New Arrivals
          </Badge>
        )}
      </div>

      <Link href={`/product/${product.id}`} className="block">
        <h3 className="text-sm font-medium mb-1 line-clamp-1">{product.title}</h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">{product.rating}</span>
          <span className="text-xs text-muted-foreground">(225 reviews)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">${discountedPrice}</span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
          )}
        </div>
      </Link>
    </div>
  )
}
