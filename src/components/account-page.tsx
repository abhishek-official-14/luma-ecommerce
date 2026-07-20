"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck, Bell, ChevronRight, CircleDollarSign, CircleHelp, CreditCard, Download,
  Gift, Heart, Home, KeyRound, LogOut, MapPin, Package, PackageCheck, Pencil, Plus,
  RotateCcw, Settings, ShieldCheck, ShoppingBag, Star, Tag, TicketCheck, Truck, UserRound,
  WalletCards, X,
} from "lucide-react";
import { products, formatPrice } from "@/lib/catalog";
import { ProductCard } from "./product-card";
import { useStore } from "./store-provider";

const nav = [
  { id: "overview", label: "Overview", icon: Home }, { id: "orders", label: "My orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart }, { id: "addresses", label: "Address book", icon: MapPin },
  { id: "wallet", label: "Wallet & rewards", icon: WalletCards }, { id: "coupons", label: "My coupons", icon: Tag },
  { id: "returns", label: "Returns & refunds", icon: RotateCcw }, { id: "cards", label: "Saved cards", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell }, { id: "support", label: "Support tickets", icon: CircleHelp },
  { id: "profile", label: "Profile & security", icon: Settings },
];

export function AccountPage({ initialTab }: { initialTab: string }) {
  const [tab, setTab] = useState(nav.some((item) => item.id === initialTab) ? initialTab : "overview");
  const { wishlist } = useStore();
  const title = nav.find((item) => item.id === tab)?.label || "Overview";

  return <main className="account-page shell"><nav className="breadcrumbs"><Link href="/">Home</Link><span>›</span><strong>My account</strong></nav><header className="account-welcome"><div className="account-avatar">AK<span><BadgeCheck /></span></div><div><p>Good afternoon,</p><h1>Ananya Kapoor</h1><span>Luma+ Member · Since 2023</span></div><div className="membership-card"><Star fill="currentColor" /><p><small>LUMA+ GOLD</small><strong>1,840 points</strong><span>160 points to your next reward</span></p><i><b /></i></div></header>
    <div className="account-layout"><aside className="account-sidebar"><nav>{nav.map((item) => { const Icon = item.icon; return <button className={tab === item.id ? "active" : ""} onClick={() => setTab(item.id)} key={item.id}><Icon />{item.label}{item.id === "orders" && <em>2</em>}{item.id === "notifications" && <em>3</em>}<ChevronRight /></button>; })}</nav><Link href="/auth/login"><LogOut /> Sign out</Link></aside><section className="account-content"><header><div><p className="eyebrow">Your Luma</p><h2>{title}</h2></div>{tab === "addresses" && <button className="primary-button"><Plus /> Add address</button>}{tab === "support" && <button className="primary-button"><Plus /> New ticket</button>}</header>
      {tab === "overview" && <Overview onNavigate={setTab} />}
      {tab === "orders" && <Orders />}
      {tab === "wishlist" && <div className="account-wishlist">{(wishlist.length ? products.filter((p) => wishlist.includes(p.id)) : products.slice(0,3)).map((product) => <ProductCard product={product} key={product.id} />)}</div>}
      {tab === "addresses" && <Addresses />}
      {tab === "wallet" && <Wallet />}
      {tab === "coupons" && <Coupons />}
      {tab === "returns" && <Returns />}
      {tab === "cards" && <Cards />}
      {tab === "notifications" && <Notifications />}
      {tab === "support" && <Support />}
      {tab === "profile" && <Profile />}
    </section></div>
  </main>;
}

function Overview({ onNavigate }: { onNavigate: (tab: string) => void }) { return <><div className="account-stat-grid"><button onClick={() => onNavigate("orders")}><Package /><p><strong>08</strong><span>Total orders</span></p><ChevronRight /></button><button onClick={() => onNavigate("wishlist")}><Heart /><p><strong>12</strong><span>Wishlist items</span></p><ChevronRight /></button><button onClick={() => onNavigate("wallet")}><WalletCards /><p><strong>₹2,450</strong><span>Wallet balance</span></p><ChevronRight /></button><button onClick={() => onNavigate("coupons")}><Tag /><p><strong>04</strong><span>Active coupons</span></p><ChevronRight /></button></div><div className="active-order"><div className="account-card-title"><div><p className="eyebrow">Arriving tomorrow</p><h3>Order #LU2605201183</h3></div><Link href="#">View order details →</Link></div><div className="active-order-body"><img src={products[0].image} alt={products[0].name} /><div><strong>{products[0].name}</strong><span>Cloud White · Qty 1</span><small>{formatPrice(products[0].price)}</small></div><div className="delivery-status"><Truck /><p><strong>Out for delivery tomorrow</strong><span>Estimated 10 AM – 2 PM</span></p></div></div><div className="tracking-line"><span className="done"><i><CheckMark /></i>Ordered<small>20 May</small></span><b /><span className="done"><i><CheckMark /></i>Packed<small>21 May</small></span><b /><span className="active"><i><Truck /></i>Shipped<small>22 May</small></span><b /><span><i><PackageCheck /></i>Delivered<small>Tomorrow</small></span></div></div><div className="overview-bottom"><div className="account-card-title"><div><h3>Recently viewed</h3><p>Pick up where you left off</p></div><Link href="/shop">View all →</Link></div><div className="recent-mini">{products.slice(2,5).map((item) => <Link key={item.id} href={`/product/${item.slug}`}><img src={item.image} alt={item.name} /><span><strong>{item.name}</strong><small>{formatPrice(item.price)}</small></span></Link>)}</div></div></>; }
function CheckMark() { return <BadgeCheck />; }
function Orders() { return <div className="orders-list"><div className="account-pills"><button className="active">All orders</button><button>In progress</button><button>Delivered</button><button>Cancelled</button></div>{[products[0], products[3]].map((product,index) => <article key={product.id}><header><span><small>ORDER PLACED</small><strong>{index ? "08 Apr 2026" : "20 May 2026"}</strong></span><span><small>TOTAL</small><strong>{formatPrice(product.price)}</strong></span><span><small>ORDER #</small><strong>LU2605{index ? "081024" : "201183"}</strong></span><button><Download /> Invoice</button></header><div><img src={product.image} alt={product.name} /><p><strong>{product.name}</strong><span>{index ? "Delivered on 10 Apr" : "Arriving tomorrow"}</span><small>{product.brand} · Qty 1</small></p><aside><button className="primary-button">{index ? "Buy again" : "Track order"}</button><button className="secondary-button">{index ? "Write a review" : "Cancel order"}</button></aside></div></article>)}</div>; }
function Addresses() { return <div className="address-grid"><article className="default"><header><strong>Home</strong><span>DEFAULT</span><button><Pencil /></button></header><h3>Ananya Kapoor</h3><p>42, Sea View Apartments, Carter Road<br />Bandra West, Mumbai 400050</p><small>+91 98765 43210</small></article><article><header><strong>Work</strong><button><Pencil /></button></header><h3>Ananya Kapoor</h3><p>Level 8, Maker Maxity, BKC<br />Mumbai, Maharashtra 400051</p><small>+91 98765 43210</small></article><button className="add-address"><Plus /> Add a new address</button></div>; }
function Wallet() { return <><div className="wallet-card"><div><p>LUMA WALLET</p><strong>₹2,450.00</strong><span>Available balance</span></div><button>Add money <Plus /></button><small>Wallet ID · LU98210348</small></div><div className="reward-card"><Gift /><p><small>REWARD POINTS</small><strong>1,840</strong><span>Worth ₹184 · 160 points to your next reward</span></p><button>Redeem points</button></div><div className="account-table"><h3>Recent transactions</h3>{["Order refund · #LU26040112","Wallet top-up","Reward redemption"].map((item,index) => <div key={item}><span><CircleDollarSign /></span><p><strong>{item}</strong><small>{index ? "12 Apr 2026" : "18 May 2026"}</small></p><em className={index === 2 ? "debit" : ""}>{index === 2 ? "− ₹250" : "+ ₹1,200"}</em></div>)}</div></>; }
function Coupons() { return <div className="coupon-grid">{[["WELCOME10","10% OFF","Save up to ₹1,000 on fashion and beauty"],["LUMAGOLD","₹500 OFF","For Luma+ Gold members on orders above ₹2,999"],["HOME20","20% OFF","Refresh your home. Maximum discount ₹1,500"]].map((coupon) => <article key={coupon[0]}><Tag /><div><small>{coupon[1]}</small><h3>{coupon[0]}</h3><p>{coupon[2]}</p><span>Valid until 31 May 2026</span></div><button>Copy</button></article>)}</div>; }
function Returns() { return <div className="return-card"><RotateCcw /><h3>No active returns</h3><p>Eligible products can be returned within 14 days of delivery. Refund status and exchange updates will appear here.</p><Link href="/account?tab=orders" className="secondary-button">View eligible orders</Link></div>; }
function Cards() { return <div className="saved-cards"><article><span>VISA</span><p><small>HDFC BANK</small><strong>•••• •••• •••• 2048</strong><em>ANANYA KAPOOR · 08/29</em></p><button><X /></button></article><button className="add-address"><Plus /> Add a payment card</button><p><ShieldCheck /> Card details are tokenized and never stored on Luma servers.</p></div>; }
function Notifications() { return <div className="notification-list">{[[Truck,"Your order is on its way","Order #LU2605201183 was shipped and arrives tomorrow.","2h"],[Tag,"A price dropped in your wishlist","The Studio Arc Sunglasses are now 27% off.","5h"],[Gift,"You earned 120 Luma points","Your points from order #LU2604081024 are ready.","2d"]].map(([Icon,title,copy,time],index) => { const I = Icon as typeof Bell; return <article key={String(title)} className={index === 0 ? "unread" : ""}><span><I /></span><p><strong>{String(title)}</strong><small>{String(copy)}</small></p><time>{String(time)}</time></article>; })}</div>; }
function Support() { return <div className="ticket-list"><article><span><TicketCheck /></span><p><strong>#TKT-4821 · Refund not reflected</strong><small>We&apos;re checking with your bank. Last response 2 hours ago.</small></p><em>In progress</em><ChevronRight /></article><article><span><Package /></span><p><strong>#TKT-4719 · Delivery instruction</strong><small>Resolved on 12 April 2026</small></p><em className="resolved">Resolved</em><ChevronRight /></article></div>; }
function Profile() { return <div className="profile-settings"><section><h3>Personal information</h3><div className="form-grid"><label>Full name<input defaultValue="Ananya Kapoor" /></label><label>Email address<input defaultValue="ananya@example.com" /></label><label>Phone number<input defaultValue="+91 98765 43210" /></label><label>Date of birth<input type="date" defaultValue="1995-08-18" /></label></div><button className="primary-button">Save changes</button></section><section><h3>Security</h3><button><KeyRound /><span><strong>Change password</strong><small>Last updated 3 months ago</small></span><ChevronRight /></button><button><ShieldCheck /><span><strong>Two-factor authentication</strong><small>Protect your account with a second verification step</small></span><em>Enable</em></button></section></div>; }
