import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/catalog";
import { ProductDetail } from "@/components/product-detail";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.description, alternates: { canonical: `/product/${product.slug}` }, openGraph: { title: product.name, description: product.description, images: [{ url: product.image }] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const structuredData = { "@context": "https://schema.org", "@type": "Product", name: product.name, image: product.gallery, description: product.description, sku: product.id, brand: { "@type": "Brand", name: product.brand }, aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews }, offers: { "@type": "Offer", priceCurrency: "INR", price: product.price, availability: "https://schema.org/InStock", url: `/product/${product.slug}` } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><ProductDetail product={product} /></>;
}
