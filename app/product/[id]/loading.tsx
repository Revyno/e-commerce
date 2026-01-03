import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/">Men</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/">Tops</Link>
          <ChevronRight className="w-3 h-3" />
          <Skeleton className="h-4 w-32 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Gallery */}
          <div className="space-y-4">
            <Skeleton className="aspect-[4/5] rounded-3xl bg-gray-200" />
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-xl bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2 bg-gray-200" />
              <Skeleton className="h-6 w-1/2 mb-4 bg-gray-200" />
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-5 w-16 bg-gray-200" />
                <Skeleton className="h-4 w-20 bg-gray-200" />
              </div>
              <Skeleton className="h-6 w-full mb-2 bg-gray-200" />
              <Skeleton className="h-6 w-2/3 bg-gray-200" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-10 w-full bg-gray-200" />
              <Skeleton className="h-10 w-full bg-gray-200" />
              <Skeleton className="h-10 w-full bg-gray-200" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-24 bg-gray-200" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full bg-gray-200" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
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
                  <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20" />
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Skeleton key={s} className="w-3 h-3" />
                        ))}
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-secondary/30 p-8 rounded-3xl h-fit space-y-6">
              <div className="flex items-baseline gap-2">
                <Skeleton className="h-12 w-16" />
                <Skeleton className="h-6 w-8" />
              </div>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <Skeleton className="h-3 w-3" />
                    <Skeleton className="flex-grow h-2 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[3/4] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
