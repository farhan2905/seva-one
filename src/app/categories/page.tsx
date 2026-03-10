import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  Home,
  Sparkles,
  Droplets,
  Zap
} from 'lucide-react';
import { Header, Footer, CategoryCard } from '@/components/seva';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'All Services - Browse Categories',
  description: 'Browse all service categories on SEVA1. Find AC repair, cleaning, plumbing, electrical services, and more.',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Sparkles,
  Droplets,
  Zap,
};

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: { products: true },
      },
      products: {
        where: { isActive: true },
        include: {
          _count: {
            select: { services: true },
          },
        },
      },
    },
    orderBy: { sortOrder: 'asc' },
  });

  // Calculate total services for each category
  const categoriesWithServices = categories.map((category) => {
    const totalServices = category.products.reduce(
      (acc, product) => acc + product._count.services,
      0
    );
    return {
      ...category,
      totalServices,
    };
  });

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-cyan-500/5 to-indigo-500/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our Services
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Choose from a wide range of home services delivered by verified professionals
            </p>

            {/* Search Box */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for a service..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white shadow-sm"
                />
              </div>
              <Button className="gradient-primary text-white px-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {categoriesWithServices.map((category) => {
              const IconComponent = iconMap[category.icon || 'Home'] || Home;
              
              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row">
                      {/* Left Side - Icon and Info */}
                      <div className="flex-1 p-6 md:p-8">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-8 h-8 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl font-semibold text-slate-900 group-hover:text-primary transition-colors mb-2">
                              {category.name}
                            </h2>
                            {category.description && (
                              <p className="text-slate-600 mb-4 line-clamp-2">
                                {category.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <span>{category._count.products} Products</span>
                              <span>•</span>
                              <span>{category.totalServices} Services</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - CTA */}
                      <div className="bg-slate-50 p-6 md:p-8 flex items-center justify-center md:justify-end">
                        <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-4 transition-all">
                          <span>View Services</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-slate-600 mb-6 max-w-lg mx-auto">
            Contact us and we&apos;ll help you find the right service for your needs.
          </p>
          <Button asChild size="lg" className="gradient-primary text-white gap-2">
            <Link href="/contact">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
