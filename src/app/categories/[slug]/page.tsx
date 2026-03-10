export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  ChevronRight,
  Wrench
} from 'lucide-react';
import { Header, Footer, ProductCard } from '@/components/seva';
import { db } from '@/lib/db';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await db.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: category.name,
    description: category.description || `Browse ${category.name} services on SEVA1.`,
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const category = await db.category.findUnique({
    where: { slug },
    include: {
      products: {
        where: { isActive: true },
        include: {
          _count: {
            select: { services: true },
          },
        },
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  if (!category) {
    notFound();
  }

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
            <span className="text-slate-900 font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-cyan-500/5 to-indigo-500/5 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg text-slate-600">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              Available Services
            </h2>
            <span className="text-slate-500">
              {category.products.length} {category.products.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          {category.products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  description={product.description}
                  imageUrl={product.imageUrl}
                  categorySlug={category.slug}
                  serviceCount={product._count.services}
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
                We&apos;re currently updating our services in this category.
              </p>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/categories">
                  Browse Other Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Explore Other Services
          </h2>
          <div className="flex flex-wrap gap-4">
            {(
              await db.category.findMany({
                where: {
                  isActive: true,
                  slug: { not: category.slug },
                },
                orderBy: { sortOrder: 'asc' },
              })
            ).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="bg-white px-4 py-2 rounded-lg border border-slate-200 hover:border-primary hover:text-primary transition-colors text-slate-700"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
