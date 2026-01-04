"use client"

import { NavbarWrapper } from "@/components/navbar-wrapper"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { useDislike } from "@/hooks/use-dislike"
import { ThumbsDown } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function DislikesPage() {
  const { dislikes } = useDislike()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDislikedProducts = async () => {
      if (dislikes.length === 0) {
        setLoading(false)
        return
      }

      try {
        const promises = dislikes.map((id: number) =>
          fetch(`https://dummyjson.com/products/${id}`, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; E-commerce App)',
            }
          }).then(res => res.json())
        )

        const fetchedProducts = await Promise.all(promises)
        setProducts(fetchedProducts)
      } catch (error) {
        console.error('Error fetching disliked products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDislikedProducts()
  }, [dislikes])

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWrapper />
      <div className="w-full max-w-screen-xl mx-auto px-4 py-8 pt-20 flex-grow overflow-x-hidden">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/">Home</Link>
          <span>/</span>
          <span className="text-foreground">Dislikes</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <ThumbsDown className="w-6 h-6 text-red-500" />
          <h1 className="text-3xl font-bold">My Dislikes</h1>
          <span className="text-muted-foreground">({dislikes.length} items)</span>
        </div>

        {dislikes.length === 0 ? (
          <div className="text-center py-16">
            <ThumbsDown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your dislikes list is empty</h2>
            <p className="text-muted-foreground mb-6">Products you dislike will appear here.</p>
            <Link href="/">
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90">
                Browse Products
              </button>
            </Link>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {dislikes.map((productId) => (
              <div key={productId} className="bg-secondary/30 p-4 rounded-lg animate-pulse">
                <div className="aspect-[3/4] bg-secondary rounded-lg mb-3"></div>
                <div className="h-4 bg-secondary rounded mb-2"></div>
                <div className="h-3 bg-secondary rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
