"use client"

import { Star, Heart, Share2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { useState } from "react"
import { toast } from "sonner"

export function ProductDetails({ product }: { product: any }) {
  const { addToCart } = useCart()
  const { wishlist, toggleWishlist } = useWishlist()
  const [selectedSize, setSelectedSize] = useState("S")
  const isWishlisted = wishlist.includes(product.id)

  const handleAddToCart = () => {
    addToCart(product)
    toast.success("Added to cart!")
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
      <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">5K+ Sold</span>
        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold">{product.rating}</span>
          <span className="text-xs text-muted-foreground">(225 reviews)</span>
        </div>
      </div>

      <div className="flex items-baseline gap-4 mb-10">
        <span className="text-5xl font-bold text-primary">${product.price}</span>
        <span className="text-xl text-muted-foreground line-through">${(product.price * 1.3).toFixed(2)}</span>
      </div>

      {/* Color Selection */}
      <div className="mb-8">
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">
          Color: <span className="text-muted-foreground font-normal">Default</span>
        </h3>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full border-2 border-primary p-0.5">
            <div className="w-full h-full rounded-full bg-primary/20" />
          </button>
          <button className="w-10 h-10 rounded-full border border-border bg-secondary" />
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-10">
        <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">
          Size: <span className="text-muted-foreground font-normal">{selectedSize}</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-10 flex items-center justify-center border rounded-lg text-xs font-bold transition-colors ${
                selectedSize === size ? "bg-black text-white border-black" : "hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <Button
          size="lg"
          onClick={handleAddToCart}
          className="w-full h-14 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 text-white"
        >
          + Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full h-14 text-lg font-bold rounded-2xl border-2 bg-transparent"
        >
          Buy this item
        </Button>
      </div>

      <div className="flex items-center justify-between border-t pt-6 text-sm font-medium">
        <button className="flex items-center gap-2 hover:text-primary transition-colors">
          <MessageCircle className="w-4 h-4" /> Chat
        </button>
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`flex items-center gap-2 transition-colors ${isWishlisted ? "text-primary font-bold" : "hover:text-primary"}`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} /> Wishlist
        </button>
        <button className="flex items-center gap-2 hover:text-primary transition-colors">
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>
    </div>
  )
}
