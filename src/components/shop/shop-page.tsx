"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Filter, GitCompareArrows, Grid2X2, List, RotateCcw, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { categories, products } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";
import { useStore } from "@/components/providers/store-provider";

export function ShopPage({ initialQuery = "", initialCategory = "", initialBrand = "", deal = false }: { initialQuery?: string; initialCategory?: string; initialBrand?: string; deal?: boolean }) {
  const [category, setCategory] = useState(initialCategory.replace("Home & Living", "Home").replace("New & Now", ""));
  const [brand, setBrand] = useState(initialBrand);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFilters, setMobileFilters] = useState(false);
  const { compare } = useStore();

  const result = useMemo(() => {
    let filtered = products.filter((product) => {
      const searchMatch = !initialQuery || `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase().includes(initialQuery.toLowerCase());
      return searchMatch && (!category || product.category === category) && (!brand || product.brand === brand) && product.price <= maxPrice && product.rating >= rating && (!deal || product.originalPrice > product.price);
    });
    if (sort === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    if (sort === "newest") filtered = [...filtered].sort((a, b) => Number(b.badge === "New") - Number(a.badge === "New"));
    return filtered;
  }, [initialQuery, category, brand, maxPrice, rating, sort, deal]);

  const reset = () => { setCategory(""); setBrand(""); setMaxPrice(25000); setRating(0); };
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  const filterContent = <>
    <div className="filter-head"><strong>Filters</strong><button onClick={reset}><RotateCcw /> Reset</button></div>
    <div className="filter-group"><h3>Category <ChevronDown /></h3><div className="filter-options">{categories.map((item) => <label key={item.name}><input type="radio" name="category" checked={category === item.name} onChange={() => setCategory(item.name)} /><span className="custom-check">{category === item.name && <Check />}</span>{item.name}<small>{products.filter((p) => p.category === item.name).length}</small></label>)}</div></div>
    <div className="filter-group"><h3>Brand <ChevronDown /></h3><input className="filter-search" placeholder="Search brands" /><div className="filter-options">{uniqueBrands.map((item) => <label key={item}><input type="checkbox" checked={brand === item} onChange={() => setBrand(brand === item ? "" : item)} /><span className="custom-check">{brand === item && <Check />}</span>{item}<small>{products.filter((p) => p.brand === item).length}</small></label>)}</div></div>
    <div className="filter-group"><h3>Price <ChevronDown /></h3><div className="range-values"><span>₹0</span><span>₹{maxPrice.toLocaleString("en-IN")}</span></div><input className="range" type="range" min="1000" max="25000" step="500" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /><div className="price-inputs"><span>₹ 0</span><i>—</i><span>₹ {maxPrice.toLocaleString("en-IN")}</span></div></div>
    <div className="filter-group"><h3>Customer rating <ChevronDown /></h3><div className="filter-options">{[4.5, 4, 3].map((value) => <label key={value}><input type="radio" name="rating" checked={rating === value} onChange={() => setRating(value)} /><span className="custom-radio" />{value} ★ & above</label>)}</div></div>
    <div className="filter-group"><h3>Availability <ChevronDown /></h3><div className="filter-options"><label><input type="checkbox" defaultChecked /><span className="custom-check"><Check /></span>In stock only</label><label><input type="checkbox" /><span className="custom-check" />COD available</label></div></div>
  </>;

  return <main className="shop-page shell">
    <nav className="breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/shop">Shop</Link>{category && <><span>›</span><strong>{category}</strong></>}</nav>
    <header className="shop-hero"><div><p className="eyebrow">Explore the collection</p><h1>{initialQuery ? `Search results for “${initialQuery}”` : category || (deal ? "Today’s deals" : "Shop everything")}</h1><p>Discover considered pieces from trusted brands and verified sellers.</p></div><div className="shop-ai"><Sparkles /><span><strong>Not sure where to start?</strong><small>Let Luma AI curate your perfect picks.</small></span><button>Try AI search</button></div></header>
    <div className="shop-toolbar"><p><strong>{result.length}</strong> products</p><div className="active-filters">{category && <button onClick={() => setCategory("")}>{category}<X /></button>}{brand && <button onClick={() => setBrand("")}>{brand}<X /></button>}{rating > 0 && <button onClick={() => setRating(0)}>{rating}★ & up<X /></button>}</div><button className="mobile-filter" onClick={() => setMobileFilters(true)}><Filter /> Filters</button><label>Sort by:<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="relevance">Relevance</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Customer rating</option><option value="newest">Newest first</option></select></label><div className="view-toggle"><button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="Grid view"><Grid2X2 /></button><button className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="List view"><List /></button></div></div>
    <div className="shop-layout"><aside className="filter-sidebar">{filterContent}</aside><section className={`catalog-grid ${view}`}>
      {result.length ? result.map((product) => <ProductCard key={product.id} product={product} />) : <div className="empty-results"><SlidersHorizontal /><h2>No exact matches</h2><p>Try clearing a few filters or explore all products.</p><button className="primary-button" onClick={reset}>Clear filters</button></div>}
    </section></div>
    {result.length > 0 && <div className="load-more"><p>You&apos;ve viewed {result.length} of {result.length} products</p><span><i style={{ width: "100%" }} /></span><button className="secondary-button">You&apos;re all caught up</button></div>}
    {compare.length > 0 && <div className="compare-bar"><GitCompareArrows /><p><strong>{compare.length} product{compare.length > 1 ? "s" : ""} selected</strong><span>Add up to 4 products to compare</span></p><button className="primary-button">Compare now</button></div>}
    {mobileFilters && <><button className="filter-scrim" onClick={() => setMobileFilters(false)} /><aside className="mobile-filter-drawer"><div className="mobile-filter-title"><strong>Filters</strong><button onClick={() => setMobileFilters(false)}><X /></button></div>{filterContent}<div className="mobile-filter-actions"><button onClick={reset}>Clear all</button><button onClick={() => setMobileFilters(false)}>Show {result.length} products</button></div></aside></>}
  </main>;
}
