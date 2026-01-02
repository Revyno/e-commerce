import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronDown, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

async function getProducts(category?: string, skip = 0) {
  const url = category
    ? `https://dummyjson.com/products/category/${category}?limit=12&skip=${skip}`
    : `https://dummyjson.com/products?limit=12&skip=${skip}`

  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error("Failed to fetch products")
  return res.json()
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; page?: string }
}) {
  const params = await searchParams
  const category = params.category
  const currentPage = Number(params.page) || 1
  const skip = (currentPage - 1) * 12

  const { products, total } = await getProducts(category, skip)
  const totalPages = Math.ceil(total / 12)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              {category?.replace("-", " ") || "All Products"}{" "}
              <span className="text-muted-foreground text-lg font-normal">({total})</span>
            </h1>
            <div className="flex items-center gap-4 text-sm">
              <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                Price <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                Size <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                Sale <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                Product Type <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full gap-2 bg-transparent">
              <SlidersHorizontal className="w-4 h-4" />
              More Filter
            </Button>
            <Button variant="ghost" className="rounded-full">
              Recommended <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="bg-primary/5 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="z-10 text-center md:text-left">
            <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">Promo</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get 25% Cash Back
              <br />
              On $200
            </h2>
            <p className="text-muted-foreground max-w-sm mb-6">
              Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
            </p>
          </div>
          <div className="relative w-full max-w-md aspect-video md:aspect-auto md:h-64">
            {/* Decorative placeholder for the banner image */}
            <div className="absolute inset-0 bg-primary/10 rounded-xl" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between border-t pt-8">
          <Link href={`?${category ? `category=${category}&` : ""}page=${Math.max(1, currentPage - 1)}`}>
            <Button variant="ghost" disabled={currentPage === 1} className="gap-2">
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              const p = i + 1
              return (
                <Link key={p} href={`?${category ? `category=${category}&` : ""}page=${p}`}>
                  <Button
                    variant={currentPage === p ? "secondary" : "ghost"}
                    className={
                      currentPage === p
                        ? "bg-primary/10 text-primary w-10 h-10 p-0 rounded-lg font-bold"
                        : "w-10 h-10 p-0"
                    }
                  >
                    {p}
                  </Button>
                </Link>
              )
            })}
            {totalPages > 5 && <span className="text-muted-foreground px-2">...</span>}
          </div>

          <Link href={`?${category ? `category=${category}&` : ""}page=${Math.min(totalPages, currentPage + 1)}`}>
            <Button variant="ghost" disabled={currentPage === totalPages} className="text-primary gap-2">
              Next Page <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
