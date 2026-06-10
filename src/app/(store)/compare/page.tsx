import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { listProducts } from "@/lib/services/catalog";
import { formatKRW } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Product Comparison",
  description:
    "Compare Korean skincare products by price, routine role, ingredients, stock, and skin concern fit.",
  openGraph: {
    title: "K-Beauty Product Comparison",
    description: "Compare Uvely Glow products side by side.",
  },
};

export default async function ComparePage() {
  const products = (await listProducts({ activeOnly: true })).slice(0, 4);

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-5xl text-deep">Product comparison</h1>
      <p className="mt-4 max-w-2xl text-muted">
        Side-by-side comparison pages help shoppers understand texture,
        ingredients, pricing, and best-fit routines before adding to cart.
      </p>
      <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-widest text-muted">
            <tr>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Best for</th>
              <th className="p-4 font-medium">Ingredients</th>
              <th className="p-4 font-medium">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-line last:border-0">
                <td className="p-4">
                  <Link href={`/products/${product.slug}`} className="font-semibold text-deep hover:text-accent">
                    {product.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted">{product.shortDescription}</p>
                </td>
                <td className="p-4">{formatKRW(product.priceKrw)}</td>
                <td className="p-4">{product.isFeatured ? "Glow routine" : "Targeted care"}</td>
                <td className="p-4 text-muted">{product.ingredients}</td>
                <td className="p-4">{product.stock > 0 ? `${product.stock} left` : "Out"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
