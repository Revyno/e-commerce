import { NavbarWrapper } from "@/components/navbar-wrapper";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import TechLogoLoop from "@/components/TechLogoLoop";

async function getProducts(
  category?: string,
  search?: string,
  skip = 0,
  sort?: string
) {
  let url;
  let sortBy = "price";
  let order = sort;

  // Handle different sort options
  if (sort === "rating") {
    sortBy = "rating";
    order = "desc";
  } else if (sort === "asc" || sort === "desc") {
    sortBy = "price";
    order = sort;
  }

  const baseParams = `limit=12&skip=${skip}${
    order ? `&sortBy=${sortBy}&order=${order}` : ""
  }`;

  if (search) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(
      search
    )}&${baseParams}`;
  } else if (category) {
    url = `https://dummyjson.com/products/category/${category}?${baseParams}`;
  } else {
    url = `https://dummyjson.com/products?${baseParams}`;
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; E-commerce App)",
      },
    });

    if (!res.ok) {
      console.error(
        `API Error: ${res.status} ${res.statusText} for URL: ${url}`
      );
      // Fallback to basic products if API fails
      const fallbackUrl = `https://dummyjson.com/products?limit=12&skip=${skip}`;
      const fallbackRes = await fetch(fallbackUrl, {
        next: { revalidate: 3600 },
      });
      if (!fallbackRes.ok)
        throw new Error(
          "Failed to fetch products from both primary and fallback URLs"
        );
      return fallbackRes.json();
    }

    return res.json();
  } catch (error) {
    console.error("Network error fetching products:", error);
    // Return empty products as last resort
    return { products: [], total: 0 };
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: {
    category?: string;
    page?: string;
    search?: string;
    sort?: string;
    filter?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    brand?: string;
  };
}) {
  const params = await searchParams;
  const category = params.category;
  const search = params.search;
  const sort = params.sort;
  const filter = params.filter;
  const minPrice = params.minPrice;
  const maxPrice = params.maxPrice;
  const rating = params.rating;
  const brand = params.brand;
  const currentPage = Number(params.page) || 1;
  const skip = (currentPage - 1) * 12;

  let { products, total } = await getProducts(category, search, skip, sort);

  // Apply client-side filtering
  if (minPrice || maxPrice || rating || brand) {
    products = products.filter((product: any) => {
      const price = product.price;
      const productRating = product.rating;
      const productBrand = product.brand?.toLowerCase();

      if (minPrice && price < parseFloat(minPrice)) return false;
      if (maxPrice && price > parseFloat(maxPrice)) return false;
      if (rating && productRating < parseFloat(rating)) return false;
      if (brand && productBrand && !productBrand.includes(brand.toLowerCase())) return false;

      return true;
    });
    total = products.length;
  }

  const totalPages = Math.ceil(total / 12);

  const buildQueryString = (
    params: Record<string, string | number | undefined>
  ) => {
    const query = new URLSearchParams();
    if (category) query.set("category", category);
    if (search) query.set("search", search);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        query.set(key, value.toString());
      }
    });
    return query.toString();
  };

  return (
    <main className="min-h-screen flex flex-col">
      <NavbarWrapper />

      <div className="w-full max-w-screen-xl mx-auto px-4 py-8 pt-20 flex-grow overflow-x-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">
              {search
                ? `Search Results for "${search}"`
                : category?.replace("-", " ") || "All Products"}{" "}
              <span className="text-muted-foreground text-lg font-normal">
                ({total})
              </span>
            </h1>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href={`?${buildQueryString({
                  sort: sort === "asc" ? "desc" : "asc",
                })}`}
              >
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                >
                  Price {sort === "asc" ? "↑" : sort === "desc" ? "↓" : ""}{" "}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href={`?${buildQueryString({ size: "L" })}`}>
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                >
                  Size <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href={`?${buildQueryString({ sale: "true" })}`}>
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                >
                  Sale <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href={`?${buildQueryString({ type: "electronics" })}`}>
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                >
                  Product Type <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href={`?${buildQueryString({ filter: "open" })}`}>
              <Button
                variant="outline"
                className="rounded-full gap-2 bg-transparent"
              >
                <SlidersHorizontal className="w-4 h-4" />
                More Filter
              </Button>
            </Link>
            <Link href={`?${buildQueryString({ sort: "rating" })}`}>
              <Button variant="ghost" className="rounded-full">
                Recommended <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Panel */}
        {filter === "open" && (
          <div className="bg-secondary/30 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Filters</h3>
              <Link href={`?${buildQueryString({ filter: undefined })}`}>
                <Button variant="ghost" size="sm">
                  ✕
                </Button>
              </Link>
            </div>
            <form id="filterForm" className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Min Price
                </label>
                <input
                  type="number"
                  name="minPrice"
                  defaultValue={minPrice || ""}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Max Price
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  defaultValue={maxPrice || ""}
                  placeholder="1000"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Rating</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  defaultValue={rating || ""}
                  placeholder="4.0"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Brand</label>
                <input
                  type="text"
                  name="brand"
                  defaultValue={params.brand || ""}
                  placeholder="Apple, Samsung, etc."
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>
            </form>
            <div className="flex gap-4 mt-6">
              <Link href={`?${buildQueryString({ filter: undefined })}`}>
                <Button variant="outline">Clear All</Button>
              </Link>
              <Button type="submit" form="filterForm">Apply Filters</Button>
            </div>
          </div>
        )}

        {/* Promo Banner */}
        <div
          className="bg-primary/5 rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative"
          style={{
            backgroundImage: "url(/banner1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="z-10 text-center md:text-left">
            <span className="text-white text-xs font-bold uppercase tracking-wider mb-2 block">
              Promo
            </span>
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
              Get 25% Cash Back
              <br />
              On $200
            </h2>
            <p className=" text-white max-w-sm mb-6">
              Shopping is a bit of a relaxing hobby for me, which is sometimes
              troubling for the bank balance.
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Tech Logo Loop */}
        <div className="my-8 mt-16">
          <TechLogoLoop />
        </div>

        <div className="mt-16 flex items-center justify-between border-t pt-8">
          <Link
            href={`?${buildQueryString({
              page: Math.max(1, currentPage - 1),
            })}`}
          >
            <Button
              variant="ghost"
              disabled={currentPage === 1}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            {[...Array(Math.min(totalPages, 3))].map((_, i) => {
              const p = i + 1;
              return (
                <Link key={p} href={`?${buildQueryString({ page: p })}`}>
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
              );
            })}
            {totalPages > 10 && (
              <span className="text-muted-foreground px-2">...</span>
            )}
          </div>

          <Link
            href={`?${buildQueryString({
              page: Math.min(totalPages, currentPage + 1),
            })}`}
          >
            <Button
              variant="ghost"
              disabled={currentPage === totalPages}
              className="text-primary gap-2"
            >
              Next Page <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
