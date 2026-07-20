import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const columns = [
  { title: "Shop", links: ["New arrivals", "Best sellers", "Today’s deals", "Gift cards", "Luma Select"] },
  { title: "Help", links: ["Help center", "Track order", "Returns & refunds", "Shipping", "Contact us"] },
  { title: "About Luma", links: ["Our story", "Careers", "Press", "Sustainability", "Sell with us"] },
  { title: "Policies", links: ["Privacy", "Terms of use", "Returns policy", "Responsible disclosure", "Accessibility"] },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link className="logo logo-light" href="/">LUMA<span>.</span></Link>
          <p>Remarkable finds, considered for modern life. Shop confidently from verified brands and independent sellers.</p>
          <div className="socials"><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="X social">X</a><a href="#" aria-label="Youtube">YT</a><a href="#" aria-label="LinkedIn">in</a></div>
        </div>
        {columns.map((column) => <div className="footer-column" key={column.title}><h3>{column.title}</h3>{column.links.map((link) => <Link href="/support" key={link}>{link}</Link>)}</div>)}
      </div>
      <div className="shell footer-trust"><p><ShieldCheck /> Payments are 100% secure & encrypted</p><div><span>VISA</span><span>mastercard.</span><span>RuPay</span><span>UPI</span><span>COD</span></div></div>
      <div className="shell footer-bottom"><p>© 2026 Luma Commerce Pvt. Ltd. All rights reserved.</p><p>Made thoughtfully in India · English / ₹ INR</p></div>
    </footer>
  );
}
