"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck, Box, ChevronDown, ChevronRight, CircleHelp, Expand, Gift, Heart,
  MapPin, Minus, PackageCheck, Play, Plus, RotateCcw, Share2, ShieldCheck, ShoppingBag,
  Sparkles, Star, ThumbsUp, Truck, Video, WandSparkles, X, Zap,
} from "lucide-react";
import type { Product } from "@/lib/catalog";
import { formatPrice, products } from "@/lib/catalog";
import { ProductCard } from "./product-card";
import { useStore } from "./store-provider";

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, wishlist, addRecentlyViewed, notify } = useStore();
  const [image, setImage] = useState(product.gallery[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [pin, setPin] = useState("");
  const [pinChecked, setPinChecked] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [openSection, setOpenSection] = useState("details");
  const saved = wishlist.includes(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  useEffect(() => { addRecentlyViewed(product.id); }, [product.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function buyNow() {
    addToCart(product, quantity, { size, color });
    router.push("/checkout");
  }

  return <main className="product-page shell">
    <nav className="breadcrumbs"><Link href="/">Home</Link><span>›</span><Link href="/shop">{product.category}</Link><span>›</span><strong>{product.name}</strong></nav>
    <section className="product-main">
      <div className="product-gallery">
        <div className="thumbnail-list">{product.gallery.map((item, index) => <button key={item} className={image === item ? "active" : ""} onClick={() => setImage(item)}><img src={item} alt={`${product.name} view ${index + 1}`} />{index === product.gallery.length - 1 && <span><Play fill="currentColor" /></span>}</button>)}</div>
        <div className="main-product-image"><img src={image} alt={product.name} /><button className="image-expand" onClick={() => setFullscreen(true)}><Expand /> Expand</button><span className="gallery-badge">{product.badge}</span><button className="gallery-video"><Video /> Watch product video</button></div>
      </div>
      <div className="product-buybox">
        <div className="buybox-top"><Link href={`/shop?brand=${product.brand}`}>{product.brand}</Link><div><button onClick={() => navigator.clipboard?.writeText(window.location.href).then(() => notify("Product link copied"))}><Share2 /></button><button className={saved ? "saved" : ""} onClick={() => toggleWishlist(product.id)}><Heart fill={saved ? "currentColor" : "none"} /></button></div></div>
        <h1>{product.name}</h1>
        <p className="product-subtitle">{product.description}</p>
        <div className="detail-rating"><span>{product.rating} <Star fill="currentColor" /></span><Link href="#reviews">{product.reviews.toLocaleString("en-IN")} ratings</Link><i /><span className="detail-bought">2K+ bought this month</span></div>
        <div className="detail-price"><strong>{formatPrice(product.price)}</strong><p>MRP <s>{formatPrice(product.originalPrice)}</s></p><span>{discount}% off</span></div>
        <p className="tax-note">Inclusive of all taxes · EMI from ₹630/month</p>
        <div className="offer-stack"><h3><Zap fill="currentColor" /> Available offers</h3><p><strong>Bank offer</strong> 10% instant discount on HDFC cards <button>View details</button></p><p><strong>Member price</strong> Extra ₹500 off with Luma+ <button>Join now</button></p></div>
        <div className="option-section"><div className="option-title"><strong>Colour: <span>{color === "#ece9e2" ? "Cloud White" : "Selected"}</span></strong><small>{product.colors.length} options</small></div><div className="color-options">{product.colors.map((item) => <button key={item} style={{ background: item }} className={color === item ? "active" : ""} onClick={() => setColor(item)} aria-label={`Choose colour ${item}`} />)}</div></div>
        <div className="option-section"><div className="option-title"><strong>Size: <span>{size}</span></strong><button><WandSparkles /> Find my size</button></div><div className="size-options">{product.sizes.map((item) => <button className={size === item ? "active" : ""} key={item} onClick={() => setSize(item)}>{item}</button>)}<button className="size-guide">Size guide →</button></div></div>
        <div className="stock-note"><span><i /> In stock</span>{product.stock <= 10 && <strong>Only {product.stock} left — order soon</strong>}</div>
        <div className="buy-actions"><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus /></button><span>{quantity}</span><button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}><Plus /></button></div><button className="add-bag" onClick={() => addToCart(product, quantity, { size, color })}><ShoppingBag /> Add to bag</button><button className="buy-now" onClick={buyNow}>Buy now</button></div>
        <div className="delivery-box"><div className="delivery-title"><MapPin /><span><strong>Delivery options</strong><small>Enter your pincode to see exact date</small></span></div><form onSubmit={(event) => { event.preventDefault(); setPinChecked(true); }}><input value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="Enter pincode" aria-label="Pincode" required minLength={6} /><button>Check</button></form>{pinChecked && <p className="delivery-result"><Truck /> Free delivery by <strong>{product.delivery}</strong><BadgeCheck /></p>}</div>
        <div className="buybox-services"><span><ShieldCheck /><strong>1 year warranty</strong><small>Brand assured</small></span><span><RotateCcw /><strong>14-day returns</strong><small>Easy & free</small></span><span><PackageCheck /><strong>Cash on delivery</strong><small>Available</small></span></div>
      </div>
    </section>

    <section className="together-section"><h2>Frequently bought together</h2><div className="together-products">{products.slice(0,3).map((item, index) => <div key={item.id}><img src={item.image} alt={item.name} />{index < 2 && <Plus />}</div>)}<div className="together-summary"><small>Total price</small><strong>{formatPrice(products.slice(0,3).reduce((sum,item) => sum + item.price, 0))}</strong><span>You save ₹3,500</span><button className="primary-button" onClick={() => products.slice(0,3).forEach((item) => addToCart(item))}>Add all 3 to bag</button></div></div></section>

    <section className="product-information">
      <nav>{["details", "specifications", "reviews", "faqs"].map((item) => <button className={openSection === item ? "active" : ""} key={item} onClick={() => setOpenSection(item)}>{item === "faqs" ? "FAQs" : item[0].toUpperCase() + item.slice(1)}{item === "reviews" && ` (${product.reviews})`}</button>)}</nav>
      {openSection === "details" && <div className="details-panel"><div><p className="eyebrow">Designed for better everyday</p><h2>Remarkable performance.<br />Considered comfort.</h2><p>{product.description} Every material has been selected for durability, tactile quality and a lower environmental impact.</p></div><div className="feature-grid"><span><Sparkles /><strong>Premium finish</strong><small>Made to feel exceptional, every day.</small></span><span><Box /><strong>Built to last</strong><small>Durable materials and careful construction.</small></span><span><ShieldCheck /><strong>Verified authentic</strong><small>Sourced directly from {product.brand}.</small></span><span><Gift /><strong>Gift-ready</strong><small>Beautiful packaging at no extra cost.</small></span></div></div>}
      {openSection === "specifications" && <div className="spec-panel"><div><span>Brand</span><strong>{product.brand}</strong></div><div><span>Model</span><strong>{product.slug.toUpperCase()}</strong></div><div><span>Category</span><strong>{product.category}</strong></div><div><span>Warranty</span><strong>1 year manufacturer warranty</strong></div><div><span>Country of origin</span><strong>India</strong></div><div><span>In the box</span><strong>Product, care guide, warranty card</strong></div></div>}
      {openSection === "reviews" && <Reviews product={product} />}
      {openSection === "faqs" && <div className="faq-panel">{["Is this product covered by warranty?", "Can I return this item?", "Is cash on delivery available?", "How do I choose the right size?"].map((question) => <details key={question}><summary>{question}<ChevronDown /></summary><p>Yes. Luma purchase protection and the listed brand warranty apply. Eligibility and exact terms are shown during checkout.</p></details>)}</div>}
    </section>

    <section className="section related"><div className="section-heading"><div><p className="eyebrow">You may also like</p><h2>Consider these, too</h2></div><Link className="text-link" href="/shop">See all <ChevronRight /></Link></div><div className="product-grid">{products.filter((item) => item.id !== product.id).slice(0,4).map((item) => <ProductCard key={item.id} product={item} />)}</div></section>
    {fullscreen && <div className="fullscreen-gallery"><button onClick={() => setFullscreen(false)}><X /></button><img src={image} alt={product.name} /></div>}
  </main>;
}

function Reviews({ product }: { product: Product }) {
  return <div className="reviews-panel" id="reviews"><div className="rating-summary"><div><strong>{product.rating}</strong><span>★★★★★</span><small>{product.reviews.toLocaleString("en-IN")} verified ratings</small></div><div>{[5,4,3,2,1].map((star) => <p key={star}><span>{star} ★</span><i><b style={{ width: `${star === 5 ? 84 : star === 4 ? 57 : 12}%` }} /></i><small>{star === 5 ? "1,814" : star === 4 ? "422" : "48"}</small></p>)}</div></div><div className="ai-summary"><Sparkles /><div><strong>AI review summary</strong><p>Customers consistently praise the premium build, effortless setup and all-day comfort. Battery life and thoughtful packaging are standout themes. A few buyers mention the fit can feel snug initially.</p><span>Summarized from {product.reviews.toLocaleString("en-IN")} verified reviews</span></div></div><div className="review-items"><article><header><span>MS</span><p><strong>Meera S.</strong><small><BadgeCheck /> Verified purchase</small></p><time>2 weeks ago</time></header><div>★★★★★ <strong>It feels even better than it looks</strong></div><p>The quality is immediately noticeable. Delivery was next-day, packaging was beautiful and setup took less than a minute. I&apos;ve already recommended it to two friends.</p><footer><button><ThumbsUp /> Helpful (84)</button><button>Report</button></footer></article><article><header><span>AK</span><p><strong>Arjun K.</strong><small><BadgeCheck /> Verified purchase</small></p><time>1 month ago</time></header><div>★★★★☆ <strong>Excellent quality and finish</strong></div><p>Does exactly what it promises. The finish is premium and after a week of use, it has become part of my daily routine.</p><footer><button><ThumbsUp /> Helpful (31)</button><button>Report</button></footer></article></div></div>;
}
