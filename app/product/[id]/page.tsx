import { NavbarWrapper } from "@/components/navbar-wrapper"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Star, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { ProductDetails } from "@/components/product-details"

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; E-commerce App)',
      }
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText} for product ID: ${id}`);
      throw new Error("Failed to fetch product");
    }

    return res.json();
  } catch (error) {
    console.error('Network error fetching product:', error);
    // Return a fallback product
    return {
      id: parseInt(id),
      title: "Product Not Found",
      description: "This product could not be loaded.",
      price: 0,
      rating: 0,
      thumbnail: "/placeholder.svg",
      images: ["/placeholder.svg"],
      brand: "Unknown",
      category: "Unknown"
    };
  }
}

async function getRelatedProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=4")
  return res.json()
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)
  const { products: related } = await getRelatedProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWrapper />
      <div className="w-full max-w-screen-xl mx-auto px-4 py-6 pt-20 overflow-x-hidden">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/">Men</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/">Tops</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] relative rounded-3xl overflow-hidden bg-secondary">
              <Image src={product.thumbnail || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square relative rounded-xl overflow-hidden bg-secondary cursor-pointer border-2 border-transparent hover:border-primary"
                >
                  <Image
                    src={product.thumbnail || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <ProductDetails product={product} />
        </div>

        {/* Reviews Section Placeholder */}
        <div className="mb-20">
          <div className="flex gap-12 border-b mb-8 text-sm font-bold uppercase tracking-wider">
            <button className="pb-4 border-b-2 border-primary text-primary">Reviews</button>
            <button className="pb-4 text-muted-foreground">Details</button>
            <button className="pb-4 text-muted-foreground">Discussion</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0" />
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold">User {i}</h4>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A simple Sweater but makes the user seem neat and beautiful, the material is soft, but when worn
                      it often wrinkles because of sitting for too long.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-secondary/30 p-8 rounded-3xl h-fit">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-bold">{product.rating}</span>
                <span className="text-muted-foreground">/ 5.0</span>
              </div>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="text-xs font-medium w-3">{s}</span>
                    <div className="flex-grow h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${s * 15}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8">You Might Like This Product</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
