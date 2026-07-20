"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight, BadgeCheck, BellRing, Bot, ChevronLeft, ChevronRight, Clock3, Gift,
  Headphones, HeartHandshake, Leaf, MessageCircle, PackageCheck, Quote, Send,
  ShieldCheck, Smartphone, Sparkles, Star, Truck, X, Zap,
} from "lucide-react";
import { brands, categories, products } from "@/lib/catalog";
import { ProductCard } from "@/components/product/product-card";

const heroImage = "https://images.pexels.com/photos/33020911/pexels-photo-33020911.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1000&h=1000";
const homeImage = "https://images.pexels.com/photos/29383227/pexels-photo-29383227.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800";
const fashionImage = "https://images.pexels.com/photos/19445634/pexels-photo-19445634.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=900&h=1100";

function SectionTitle({ eyebrow, title, subtitle, href = "/shop" }: { eyebrow: string; title: string; subtitle?: string; href?: string }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><Link className="text-link" href={href}>View all <ArrowRight size={14} /></Link></div>;
}

function Countdown() {
  const [remaining, setRemaining] = useState(8 * 3600 + 42 * 60 + 18);
  useEffect(() => { const timer = window.setInterval(() => setRemaining((value) => value > 0 ? value - 1 : 24 * 3600), 1000); return () => clearInterval(timer); }, []);
  const hours = Math.floor(remaining / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((remaining % 3600) / 60).toString().padStart(2, "0");
  const seconds = (remaining % 60).toString().padStart(2, "0");
  return <div className="countdown"><span><b>{hours}</b><small>HRS</small></span><i>:</i><span><b>{minutes}</b><small>MIN</small></span><i>:</i><span><b>{seconds}</b><small>SEC</small></span></div>;
}

function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  return <div className={`ai-chat ${open ? "open" : ""}`}>
    {open && <div className="chat-window">
      <div className="chat-head"><span><span className="chat-avatar"><Sparkles /></span><span><strong>Luma AI</strong><small><i /> Online · replies instantly</small></span></span><button onClick={() => setOpen(false)} aria-label="Close assistant"><X /></button></div>
      <div className="chat-body"><p className="chat-time">Today, 10:28 AM</p><div className="bot-message">Hi! I&apos;m your personal shopping assistant. What are you looking for today?</div><div className="chat-options"><button>Find a gift under ₹3,000</button><button>Help me choose headphones</button><button>Where is my order?</button></div>{sent && <><div className="user-message">Show me today&apos;s best offers</div><div className="bot-message">I found 24 handpicked deals with an extra 10% off. The Aura Pro headphones are today&apos;s top-rated pick.</div></>}</div>
      <form className="chat-input" onSubmit={(event) => { event.preventDefault(); setSent(true); }}><input placeholder="Ask anything…" aria-label="Chat message" /><button aria-label="Send"><Send /></button></form>
    </div>}
    <button className="chat-launcher" onClick={() => setOpen(!open)} aria-label="Open AI shopping assistant">{open ? <X /> : <><Bot /><span><strong>Ask Luma AI</strong><small>How can I help?</small></span></>}</button>
  </div>;
}

export function HomePage() {
  return <main>
    <section className="hero shell">
      <div className="hero-copy">
        <p className="hero-kicker"><span /> The elevated everyday edit</p>
        <h1>Find what feels<br /><em>made for you.</em></h1>
        <p>Thoughtfully chosen fashion, technology and home essentials—from brands you&apos;ll love and sellers you can trust.</p>
        <div className="hero-actions"><Link href="/shop" className="primary-button">Shop the collection <ArrowRight /></Link><Link href="/shop?deal=true" className="hero-quiet-link">Explore today&apos;s deals <span>↗</span></Link></div>
        <div className="hero-social-proof"><div className="avatar-stack"><span>AR</span><span>SM</span><span>PK</span><span>+2k</span></div><div><div><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div><p>Loved by 2 million+ shoppers</p></div></div>
      </div>
      <div className="hero-visual">
        <img src={heroImage} alt="Woman enjoying a premium shopping experience" />
        <div className="hero-tag hero-tag-top"><span><HeartHandshake /></span><p><small>Handpicked for you</small><strong>Curated quality</strong></p></div>
        <Link href={`/product/${products[3].slug}`} className="hero-product"><img src={products[3].image} alt="" /><p><small>Editor&apos;s pick</small><strong>Mila Leather Tote</strong><span>₹5,299 <ArrowRight /></span></p></Link>
        <div className="hero-index"><strong>01</strong><span /><small>03</small><button aria-label="Previous"><ChevronLeft /></button><button aria-label="Next"><ChevronRight /></button></div>
      </div>
    </section>

    <section className="benefits shell" aria-label="Shopping benefits">
      <div><Truck /><p><strong>Free shipping</strong><span>On orders over ₹999</span></p></div>
      <div><PackageCheck /><p><strong>Easy 14-day returns</strong><span>No questions asked</span></p></div>
      <div><ShieldCheck /><p><strong>Secure payments</strong><span>100% protected checkout</span></p></div>
      <div><Headphones /><p><strong>Always here to help</strong><span>24/7 human support</span></p></div>
    </section>

    <section className="section category-section">
      <div className="shell"><SectionTitle eyebrow="Browse beautifully" title="Shop by category" subtitle="A considered selection for every part of your day." />
        <div className="category-grid">{categories.map((category, index) => <Link href={`/shop?category=${category.name}`} className={`category-card category-${index}`} key={category.name}><div><img src={category.image} alt={category.name} /><span><ArrowRight /></span></div><p><strong>{category.name}</strong><small>{category.eyebrow}</small></p></Link>)}</div>
      </div>
    </section>

    <section className="flash-section section">
      <div className="shell"><div className="flash-head"><div><p className="eyebrow"><Zap fill="currentColor" /> Limited time</p><h2>Flash sale</h2></div><div className="flash-timer-label"><span>Ends in</span><Countdown /></div><Link className="text-link" href="/shop?deal=true">Shop all deals <ArrowRight /></Link></div>
        <div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </div>
    </section>

    <section className="story-banners shell">
      <article className="story-banner story-fashion"><img src={fashionImage} alt="Modern fashion edit" /><div><p>THE NEW FASHION EDIT</p><h2>Quiet luxury,<br />loud confidence.</h2><span>Up to 40% off premium styles</span><Link href="/shop?category=Fashion">Explore fashion <ArrowRight /></Link></div></article>
      <article className="story-banner story-home"><img src={homeImage} alt="Warm modern home" /><div><p>THE HOME REFRESH</p><h2>Spaces that<br />feel like you.</h2><span>Design-led pieces from ₹799</span><Link href="/shop?category=Home">Shop home <ArrowRight /></Link></div></article>
    </section>

    <section className="section">
      <div className="shell"><SectionTitle eyebrow="Loved, tried, trusted" title="Bestsellers right now" subtitle="The products everyone is talking about—backed by thousands of five-star reviews." />
        <div className="product-grid">{products.slice(4, 8).map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </div>
    </section>

    <section className="deal-hero shell">
      <div className="deal-copy"><p className="eyebrow">Today&apos;s spotlight</p><span className="deal-chip"><Clock3 /> Only 9 left at this price</span><h2>Hear every<br /><em>beautiful detail.</em></h2><p>SONORA Aura Pro with spatial audio and studio-grade comfort.</p><div className="deal-price"><strong>₹12,999</strong><s>₹16,999</s><span>Save 24%</span></div><Link href={`/product/${products[0].slug}`} className="primary-button">Discover Aura Pro <ArrowRight /></Link></div>
      <div className="deal-image"><span className="sound-wave">∿∿∿</span><img src={products[0].image} alt={products[0].name} /><div className="feature-callout feature-one"><i />40-hour battery</div><div className="feature-callout feature-two"><i />Adaptive audio</div></div>
    </section>

    <section className="section brand-section"><div className="shell"><SectionTitle eyebrow="Names you know" title="Brands we love" /><div className="brand-row">{brands.map((brand) => <Link href={`/shop?brand=${brand}`} key={brand}>{brand}</Link>)}</div></div></section>

    <section className="section section-soft">
      <div className="shell"><SectionTitle eyebrow="Freshly dropped" title="New & noteworthy" subtitle="Future favourites, just landed." />
        <div className="product-grid">{[products[2], products[5], products[7], products[1]].map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </div>
    </section>

    <section className="personal-section shell">
      <div className="personal-copy"><span className="sparkle-box"><Sparkles /></span><p className="eyebrow">Powered by Luma AI</p><h2>Your taste.<br />Only <em>smarter.</em></h2><p>Tell us what you love and our AI stylist will build a collection around your preferences, fit and budget.</p><ul><li><BadgeCheck /> Personalized recommendations</li><li><BadgeCheck /> Smart size & fit guidance</li><li><BadgeCheck /> Complete-the-look matching</li></ul><Link href="/shop?personalized=true" className="primary-button">Build my edit <ArrowRight /></Link></div>
      <div className="personal-collage"><div className="collage-main"><img src={products[7].image} alt="Personalized style" /><span>92% match</span></div><div className="collage-side"><img src={products[3].image} alt="Recommended bag" /><img src={products[5].image} alt="Recommended jewellery" /></div><div className="ai-reco-card"><Sparkles /><p><small>WHY YOU&apos;LL LOVE IT</small><strong>Matches your saved minimal style and warm palette.</strong></p></div></div>
    </section>

    <section className="section review-section"><div className="shell"><div className="reviews-head"><div><p className="eyebrow">Real stories</p><h2>What our community says</h2></div><div className="overall-rating"><strong>4.8</strong><span><span>★★★★★</span><small>from 48,000+ verified reviews</small></span></div></div>
      <div className="review-grid">
        <article><Quote /><div className="review-stars">★★★★★</div><p>“Every part of the experience feels considered—from discovering the right product to the beautiful, plastic-free packaging.”</p><footer><span>MN</span><p><strong>Meera Nair</strong><small><BadgeCheck /> Verified customer</small></p></footer></article>
        <article className="featured-review"><Quote /><div className="review-stars">★★★★★</div><p>“Luma AI found exactly the headphones I needed in under a minute. They arrived the next morning and honestly exceeded expectations.”</p><footer><span>RS</span><p><strong>Rohan Shah</strong><small><BadgeCheck /> Verified customer</small></p></footer></article>
        <article><Quote /><div className="review-stars">★★★★★</div><p>“Finally, a marketplace that doesn&apos;t feel overwhelming. The curation is excellent and returns genuinely are effortless.”</p><footer><span>AP</span><p><strong>Ananya Patel</strong><small><BadgeCheck /> Verified customer</small></p></footer></article>
      </div>
    </div></section>

    <section className="section journal-section"><div className="shell"><SectionTitle eyebrow="The Luma journal" title="Ideas for modern living" href="/support" />
      <div className="journal-grid"><article className="journal-feature"><img src={homeImage} alt="Warm minimalist home" /><div><span>HOME · 6 MIN READ</span><h3>The art of a calmer, more considered home</h3><p>Small changes that make your everyday spaces feel more grounded.</p><Link href="/support">Read the story <ArrowRight /></Link></div></article><div className="journal-list"><article><img src={fashionImage} alt="Fashion trends" /><div><span>STYLE · 4 MIN</span><h3>Five forever pieces worth investing in</h3><Link href="/support">Read more →</Link></div></article><article><img src={products[2].image} alt="Skincare" /><div><span>BEAUTY · 5 MIN</span><h3>A simpler, science-backed skin routine</h3><Link href="/support">Read more →</Link></div></article></div></div>
    </div></section>

    <section className="app-banner shell"><div className="app-copy"><p className="eyebrow"><Smartphone /> Luma in your pocket</p><h2>Shopping, made<br />wonderfully simple.</h2><p>Get app-only offers, real-time order updates and smarter recommendations wherever you are.</p><div className="store-buttons"><button><span>●</span><p><small>Download on the</small><strong>App Store</strong></p></button><button><span>▶</span><p><small>GET IT ON</small><strong>Google Play</strong></p></button></div><div className="app-points"><span><BellRing /> Live order alerts</span><span><Gift /> App-only rewards</span><span><Leaf /> Paperless returns</span></div></div><div className="phone-mock"><div className="phone"><div className="phone-bar" /><div className="phone-logo">LUMA<span>.</span></div><div className="phone-hero"><img src={products[3].image} alt="Luma app" /><b>Made for<br />your moment.</b></div><small>Picked for you</small><div className="phone-products"><img src={products[0].image} alt="" /><img src={products[2].image} alt="" /></div></div></div></section>

    <section className="newsletter"><div className="shell newsletter-inner"><div><p className="eyebrow">A little inspiration, delivered</p><h2>Be first to know what&apos;s next.</h2><p>New arrivals, thoughtful stories and members-only offers. No noise, just the good stuff.</p></div><form onSubmit={(event) => event.preventDefault()}><div><input type="email" placeholder="Your email address" required aria-label="Email address" /><button>Join the list <ArrowRight /></button></div><label><input type="checkbox" required /> I agree to receive marketing emails. Unsubscribe anytime.</label></form></div></section>
    <ChatAssistant />
  </main>;
}
