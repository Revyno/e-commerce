"use client"

import Link from "next/link"
import { Search, User, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { CartSidebar } from "@/components/cart-sidebar"

export function Navbar() {
  const { cart } = useCart()
  const { wishlist } = useWishlist()

  return (
    <nav className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
          Shopz
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/?category=mens-shirts" className="hover:text-primary transition-colors">
            Man
          </Link>
          <Link href="/?category=womens-dresses" className="hover:text-primary transition-colors">
            Woman
          </Link>
          <Link href="/?category=tops" className="hover:text-primary transition-colors">
            Kids
          </Link>
        </div>

        <div className="flex-1 max-w-md hidden lg:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search a products" className="pl-10 bg-secondary border-none rounded-full h-10" />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-secondary rounded-full lg:hidden">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-full">
            <User className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-full relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-[10px] text-white rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
          <CartSidebar />
        </div>
      </div>
    </nav>
  )
}
