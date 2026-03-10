import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Clock, Shield, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Header, Footer } from '@/components/seva';
import { getServiceBySlug, getProductForService, getCategoryForProduct, getServicesByProduct } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };
  const product = getProductForService(service.id);
  return {
    title: `${service.name}${product ? ` - ${product.name}` : ''}`,
    description: service.description || `Book ${service.name} service on SEVA1.`,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const product = getProductForService(service.id);
  const category = product ? getCategoryForProduct(product.id) : null;
  const relatedServices = product
    ? getServicesByProduct(product.id).filter((s) => s.id !== service.id).slice(0, 4)
    : [];

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const discount = service.discountedPrice
    ? Math.round(((service.price - service.discountedPrice) / service.price) * 100)
    : 0;

  const includedFeatures = [
    'Professional service by verified experts',
    'Quality materials and parts',
    'Service warranty included',
    'Transparent pricing',
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-slate-500 hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link href="/categories" className="text-slate-500 hover:text-primary transition-colors">Services</Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            {category && (
              <>
                <Link href={`/categories/${category.slug}`} className="text-slate-500 hover:text-primary transition-colors">
                  {category.name}
                </Link>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </>
            )}
            {product && (
              <>
                <Link href={`/products/${product.slug}`} className="text-slate-500 hover:text-primary transition-colors">
                  {product.name}
                </Link>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </>
            )}
            <span className="text-slate-900 font-medium">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Service Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant={
                          service.serviceType === 'Installation'
                            ? 'default'
                            : service.serviceType === 'Maintenance'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {service.serviceType}
                      </Badge>
                      {discount > 0 && (
                        <Badge className="bg-red-500 text-white hover:bg-red-600">{discount}% OFF</Badge>
                      )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{service.name}</h1>
                  </div>
                </div>

                {service.description && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold text-slate-900 mb-3">About this Service</h2>
                    <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  </div>
                )}

                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-slate-900 mb-3">What&apos;s Included</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {includedFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 py-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Duration</p>
                      <p className="font-semibold text-slate-900">{formatDuration(service.duration)}</p>
                    </div>
                  </div>
                  {service.warranty && service.warranty !== 'N/A' && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Warranty</p>
                        <p className="font-semibold text-slate-900">{service.warranty}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
                <div className="mb-6">
                  <div className="flex items-end gap-2 mb-2">
                    {service.discountedPrice ? (
                      <>
                        <span className="text-3xl font-bold text-primary">{formatPrice(service.discountedPrice)}</span>
                        <span className="text-lg text-slate-400 line-through">{formatPrice(service.price)}</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-primary">{formatPrice(service.price)}</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">Inclusive of all taxes</p>
                </div>

                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">4.8 (125 reviews)</span>
                </div>

                <Button asChild size="lg" className="w-full gradient-primary text-white mb-4">
                  <Link href={`/book/${service.id}`}>Book Now</Link>
                </Button>

                <div className="text-center text-sm text-slate-500">
                  <p>Free cancellation up to 24 hours before</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Other {product?.name} Services
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.id}
                  href={`/services/${relatedService.slug}`}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-primary hover:shadow-md transition-all"
                >
                  <h3 className="font-medium text-slate-900 hover:text-primary transition-colors mb-2">
                    {relatedService.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">
                      {formatPrice(relatedService.discountedPrice || relatedService.price)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
