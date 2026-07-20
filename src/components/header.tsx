"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Barcode, Camera, ChevronDown, Heart, MapPin, Menu, Mic, Search, ShoppingBag,
  Sparkles, UserRound, X, Home, Grid2X2, Bell, Package, CircleHelp,
} from "lucide-react";
import { products } from "@/lib/catalog";
import { useStore } from "./store-provider";

const nav = ["New & Now", "Fashion", "Electronics", "Beauty", "Home & Living", "Footwear", "Gifts"];

export function Header() {
  const { cartCount, wishlist } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const suggestions = query.trim()
    ? products.filter((product) => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : products.slice(0, 4);

  function search(event: React.FormEvent) {
    event.preventDefault();
    setFocused(false);
    router.push(`/shop?q=${encodeURIComponent(query)}`);
  }

  return (
    <>
      <div className="announcement">
        <div className="shell announcement-inner">
          <p><Sparkles size={13} /> New member offer: Extra 10% off your first order <strong>WELCOME10</strong></p>
          <div><button>Sell on Luma</button><span /> <button>Help & Support</button><span /> <button>EN <ChevronDown size={12} /></button></div>
        </div>
      </div>
      <header className="site-header">
        <div className="shell header-main">
          <button className="icon-button mobile-menu-button" aria-label="Open menu" onClick={() => setMobileOpen(true)}><Menu /></button>
          <Link className="logo" href="/" aria-label="Luma home">LUMA<span>.</span></Link>
          <button className="location-control"><MapPin size={20} /><span><small>Deliver to</small><strong>Mumbai 400001</strong></span><ChevronDown size={14} /></button>
          <form className="search-wrap" onSubmit={search}>
            <Search className="search-icon" size={20} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setFocused(true)} placeholder="Search products, brands and categories" aria-label="Search products" />
            <div className="search-tools"><button type="button" title="Voice search"><Mic size={19} /></button><button type="button" title="Image search"><Camera size={19} /></button></div>
            {focused && (
              <div className="search-panel">
                <div className="search-panel-title"><span>{query ? "Suggestions" : "Trending searches"}</span><small>AI enhanced</small></div>
                {suggestions.map((product) => (
                  <Link key={product.id} href={`/product/${product.slug}`} onMouseDown={() => setFocused(false)}>
                    <img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{product.brand} · {product.category}</small></span><Search size={15} />
                  </Link>
                ))}
                <button className="semantic-search" type="submit"><Sparkles size={16} /> Ask Luma AI to find “{query || "summer essentials"}”</button>
                <div className="alt-search"><button type="button"><Barcode size={15} /> Scan barcode</button><button type="button"><Camera size={15} /> Search by image</button></div>
              </div>
            )}
          </form>
          <nav className="header-actions" aria-label="Account actions">
            <Link href="/auth/login"><UserRound /><span><small>Hello, sign in</small><strong>Account</strong></span></Link>
            <Link href="/account?tab=wishlist" className="header-action-simple"><Heart /><b>{wishlist.length}</b><span>Wishlist</span></Link>
            <Link href="/cart" className="header-action-simple"><ShoppingBag /><b>{cartCount}</b><span>Bag</span></Link>
          </nav>
        </div>
        <div className="desktop-nav-wrap">
          <nav className="shell desktop-nav">
            <Link href="/shop" className="all-categories"><Menu size={17} /> All categories <ChevronDown size={14} /></Link>
            {nav.map((item) => <Link key={item} href={`/shop?category=${encodeURIComponent(item)}`}>{item}{item === "New & Now" && <em>HOT</em>}</Link>)}
            <Link href="/shop?deal=true" className="nav-deal">Today&apos;s Deals</Link>
          </nav>
        </div>
      </header>
      {mobileOpen && <button className="drawer-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <div className="drawer-head"><Link className="logo" href="/">LUMA<span>.</span></Link><button onClick={() => setMobileOpen(false)}><X /></button></div>
        <div className="drawer-welcome"><div className="avatar">AK</div><span><small>Welcome</small><strong>Sign in / Create account</strong></span></div>
        <nav>
          <Link href="/shop"><Grid2X2 /> Shop all</Link>
          {nav.map((item) => <Link key={item} href={`/shop?category=${item}`}>{item}<span>›</span></Link>)}
          <hr />
          <Link href="/account?tab=orders"><Package /> My orders</Link>
          <Link href="/account?tab=notifications"><Bell /> Notifications</Link>
          <Link href="/support"><CircleHelp /> Help center</Link>
        </nav>
      </aside>
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <Link className={pathname === "/" ? "active" : ""} href="/"><Home /><span>Home</span></Link>
        <Link className={pathname === "/shop" ? "active" : ""} href="/shop"><Grid2X2 /><span>Shop</span></Link>
        <Link href="/account?tab=wishlist"><Heart /><b>{wishlist.length}</b><span>Wishlist</span></Link>
        <Link href="/cart"><ShoppingBag /><b>{cartCount}</b><span>Bag</span></Link>
        <Link href="/account"><UserRound /><span>Account</span></Link>
      </nav>
    </>
  );
}
