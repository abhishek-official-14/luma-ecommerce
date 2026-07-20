"use client";

import Link from "next/link";
import { Check, GitCompareArrows, Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/catalog";
import { useStore } from "./store-provider";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare } = useStore();
  const saved = wishlist.includes(product.id);
  const compared = compare.includes(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <article className={`product-card ${compact ? "compact" : ""}`}>
      <div className="product-image-wrap">
        <Link href={`/product/${product.slug}`}><img loading="lazy" src={product.image} alt={product.name} /></Link>
        {product.badge && <span className={`product-badge badge-${product.badge.toLowerCase()}`}>{product.badge}</span>}
        <div className="product-float-actions">
          <button className={saved ? "active" : ""} onClick={() => toggleWishlist(product.id)} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}><Heart fill={saved ? "currentColor" : "none"} /></button>
          <button className={compared ? "active" : ""} onClick={() => toggleCompare(product.id)} aria-label="Compare product">{compared ? <Check /> : <GitCompareArrows />}</button>
        </div>
        <button className="quick-add" onClick={() => addToCart(product)}><ShoppingBag size={17} /> Quick add</button>
      </div>
      <div className="product-info">
        <Link href={`/shop?brand=${product.brand}`} className="product-brand">{product.brand}</Link>
        <Link href={`/product/${product.slug}`} className="product-name">{product.name}</Link>
        <div className="rating"><strong>{product.rating}</strong><Star fill="currentColor" /><span>({product.reviews.toLocaleString("en-IN")})</span></div>
        <div className="product-price"><strong>{formatPrice(product.price)}</strong><s>{formatPrice(product.originalPrice)}</s><em>{discount}% off</em></div>
        <p className="delivery-note">Free delivery by tomorrow</p>
      </div>
    </article>
  );
}
