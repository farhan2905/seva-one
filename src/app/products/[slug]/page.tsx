export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight,
  Wrench,
  Clock,
  Shield
} from 'lucide-react';
import { Header, Footer, ServiceCard } from '@/components/seva';
import { db } from '@/lib/db';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - ${product.category.name}`,
    description: product.description || `Browse ${product.name} services on SEVA1.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const product = await db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      services: {
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-500 hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link href="/categories" className="text-slate-500 hover:text-primary transition-colors">
              Services
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link 
              href={`/categories/${product.category.slug}`} 
              className="text-slate-500 hover:text-primary transition-colors"
            >
              {product.category.name}
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="text-slate-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-cyan-500/5 to-indigo-500/5 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                {product.name}
              </h1>
              {product.description && (
                <p className="text-lg text-slate-600 mb-6">
                  {product.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>{product.services.length} services available</span>
                {product.services.length > 0 && (
                  <>
                    <span>•</span>
                    <span>Starting from {formatPrice(Math.min(...product.services.map(s => s.discountedPrice || s.price)))}</span>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center">
                <Wrench className="w-20 h-20 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">
            Available Services
          </h2>

          {product.services.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {product.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  name={service.name}
                  slug={service.slug}
                  description={service.description}
                  price={service.price}
                  discountedPrice={service.discountedPrice}
                  duration={service.duration}
                  serviceType={service.serviceType}
                  warranty={service.warranty}
                  productSlug={product.slug}
                  categorySlug={product.category.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No services available
              </h3>
              <p className="text-slate-500 mb-6">
                We&apos;re currently updating our services for this product.
              </p>
              <Button asChild variant="outline">
                <Link href={`/categories/${product.category.slug}`}>
                  Back to {product.category.name}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Other Products in Category */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Other {product.category.name} Services
          </h2>
          <div className="flex flex-wrap gap-4">
            {(
              await db.product.findMany({
                where: {
                  isActive: true,
                  categoryId: product.categoryId,
                  slug: { not: product.slug },
                },
                orderBy: { sortOrder: 'asc' },
              })
            ).map((prod) => (
              <Link
                key={prod.id}
                href={`/products/${prod.slug}`}
                className="bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-primary hover:text-primary transition-colors text-slate-700"
              >
                {prod.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
