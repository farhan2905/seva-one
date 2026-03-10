import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Shield, 
  Clock, 
  Award, 
  Star, 
  ArrowRight,
  CheckCircle,
  Phone,
  Home,
  Sparkles,
  Droplets,
  Zap,
  Users,
  Wrench,
  BadgeCheck,
  Wallet
} from 'lucide-react';
import { Header, Footer, CategoryCard, ServiceCard } from '@/components/seva';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'SEVA1 - Expert Home Services at Your Doorstep',
  description: 'Book verified professionals for AC repair, cleaning, plumbing, electrical services, and more. Quality service guaranteed with transparent pricing.',
};

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Excellent AC service! The technician was professional and fixed the issue in no time. The pricing was transparent with no hidden charges.',
    service: 'AC Repair',
    avatar: 'RS',
  },
  {
    id: 2,
    name: 'Priya Patel',
    location: 'Delhi',
    rating: 5,
    text: 'Got my deep cleaning done through SEVA1. The team was punctual and did a thorough job. My house looks brand new!',
    service: 'Deep Cleaning',
    avatar: 'PP',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    location: 'Bangalore',
    rating: 5,
    text: 'Quick response and quality plumbing work. The leak was fixed efficiently. Great service at a reasonable price.',
    service: 'Plumbing',
    avatar: 'AK',
  },
];

// Stats data
const stats = [
  { value: '50,000+', label: 'Happy Customers', icon: Users },
  { value: '500+', label: 'Verified Professionals', icon: BadgeCheck },
  { value: '4.8', label: 'Average Rating', icon: Star },
  { value: '30 min', label: 'Average Response', icon: Clock },
];

// Features data
const features = [
  {
    icon: BadgeCheck,
    title: 'Verified Professionals',
    description: 'All our service providers are background verified, trained, and certified professionals.',
    color: 'from-[#003366]/10 to-[#003366]/5',
  },
  {
    icon: Clock,
    title: 'On-Time Service',
    description: 'We value your time. Our professionals arrive on time, every time, or we compensate.',
    color: 'from-[#FF8C00]/10 to-[#FF8C00]/5',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    description: 'Not satisfied? We offer a 30-day service guarantee on all bookings. No questions asked.',
    color: 'from-green-500/10 to-green-500/5',
  },
  {
    icon: Wallet,
    title: 'Transparent Pricing',
    description: 'No hidden charges. Pay only what you see upfront. We believe in honest pricing.',
    color: 'from-purple-500/10 to-purple-500/5',
  },
];

// How it works steps
const steps = [
  {
    step: 1,
    title: 'Choose a Service',
    description: 'Browse our wide range of home services and select what you need.',
    icon: Search,
  },
  {
    step: 2,
    title: 'Book a Slot',
    description: 'Pick a convenient time slot that works for you.',
    icon: Clock,
  },
  {
    step: 3,
    title: 'Get it Done',
    description: 'Our verified professional arrives and gets the job done.',
    icon: CheckCircle,
  },
];

export default async function HomePage() {
  // Fetch categories and featured services
  const categories = await db.category.findMany({
    where: { isActive: true },
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { sortOrder: 'asc' },
    take: 4,
  });

  const featuredServices = await db.service.findMany({
    where: { 
      isActive: true,
      discountedPrice: { not: null },
    },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
    orderBy: { discountedPrice: 'desc' },
    take: 4,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden hero-pattern">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF8C00]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] hero-pattern-grid opacity-50" />
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-[#003366]/5 border border-[#003366]/10 px-4 py-2 rounded-full text-sm font-medium text-[#003366] mb-6 animate-fade-in">
                <Shield className="w-4 h-4" />
                <span>Trusted by 50,000+ customers across India</span>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#003366] mb-6 leading-tight">
                Expert Home Services at Your{' '}
                <span className="text-gradient-accent">Doorstep</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                From AC repairs to deep cleaning, plumbing to electrical work — book verified professionals for all your home service needs.
              </p>

              {/* Search Box */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto lg:mx-0 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for a service..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 focus:border-[#003366] focus:bg-white bg-white shadow-soft transition-all outline-none"
                  />
                </div>
                <Button size="lg" className="btn-accent shadow-accent h-14 px-8 text-base">
                  Search
                </Button>
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="text-sm text-gray-400">Popular:</span>
                {['AC Service', 'Cleaning', 'Plumbing', 'Electrical'].map((item) => (
                  <Link
                    key={item}
                    href="/categories"
                    className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-full hover:border-[#FF8C00] hover:text-[#FF8C00] transition-all shadow-soft"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side - Floating Cards */}
            <div className="hidden lg:block relative h-[450px]">
              {/* Main Service Card */}
              <div className="absolute top-8 right-0 glass rounded-2xl p-5 shadow-strong w-64 animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
                    <Home className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#003366]">AC Service</p>
                    <p className="text-sm text-gray-500">Starting ₹499</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-[#003366] to-[#FF8C00] border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">1.2k+ booked today</span>
                </div>
              </div>

              {/* Cleaning Card */}
              <div className="absolute top-1/3 left-0 glass rounded-2xl p-5 shadow-strong w-64 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center shadow-accent">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#003366]">Deep Cleaning</p>
                    <p className="text-sm text-gray-500">Starting ₹2,999</p>
                  </div>
                </div>
              </div>

              {/* Electrical Card */}
              <div className="absolute bottom-10 right-8 glass rounded-2xl p-5 shadow-strong w-64 animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-soft">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#003366]">Electrical</p>
                    <p className="text-sm text-gray-500">Starting ₹199</p>
                  </div>
                </div>
              </div>

              {/* Center Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-36 h-36 rounded-full gradient-primary flex items-center justify-center shadow-strong">
                    <Wrench className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -inset-3 rounded-full border-2 border-[#003366]/20 animate-pulse-slow" />
                  <div className="absolute -inset-6 rounded-full border border-[#003366]/10 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-gradient-to-r from-[#003366] via-[#004080] to-[#003366] py-14">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className="w-8 h-8 text-[#FF8C00] mx-auto mb-2" />
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8C00]/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[#FF8C00] font-semibold text-sm mb-4">
              <span className="w-8 h-0.5 bg-[#FF8C00] rounded-full" />
              Our Services
              <span className="w-8 h-0.5 bg-[#FF8C00] rounded-full" />
            </span>
            <h2 className="section-title">What We Offer</h2>
            <p className="section-subtitle">
              Choose from a wide range of home services delivered by verified professionals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={category.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  slug={category.slug}
                  description={category.description}
                  icon={category.icon}
                  productCount={category._count.products}
                  size="lg"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="btn-outline-primary gap-2">
              <Link href="/categories">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      {featuredServices.length > 0 && (
        <section className="py-20 md:py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-[#FF8C00] font-semibold text-sm mb-4">
                <span className="w-8 h-0.5 bg-[#FF8C00] rounded-full" />
                Best Deals
                <span className="w-8 h-0.5 bg-[#FF8C00] rounded-full" />
              </span>
              <h2 className="section-title">Featured Services</h2>
              <p className="section-subtitle">
                Best deals on our most popular services
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredServices.map((service, index) => (
                <div key={service.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    slug={service.slug}
                    description={service.description}
                    price={service.price}
                    discountedPrice={service.discountedPrice}
                    duration={service.duration}
                    serviceType={service.serviceType}
                    warranty={service.warranty}
                    productSlug={service.product.slug}
                    categorySlug={service.product.category.slug}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] hero-pattern-grid opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[#FF8C00] font-semibold text-sm mb-4">
              <span className="w-8 h-0.5 bg-[#FF8C00] rounded-full" />
              Simple Process
              <span className="w-8 h-0.5 bg-[#FF8C00] rounded-full" />
            </span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Book your service in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.step} className="relative text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-1/2 w-full h-0.5">
                    <div className="w-full h-full bg-gradient-to-r from-[#003366] via-[#FF8C00] to-[#003366] opacity-20" />
                  </div>
                )}
                
                <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-gradient-to-br from-[#003366]/5 to-[#FF8C00]/5 mb-6 group">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full gradient-accent text-white flex items-center justify-center font-bold text-lg shadow-accent">
                    {step.step}
                  </div>
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl icon-container group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-[#003366]" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-[#003366] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[#FF8C00] font-semibold text-sm mb-4">
              <span className="w-8 h-0.5 bg-[#FF8C00] rounded-full" />
              Why Choose Us
              <span className="w-8 h-0.5 bg-[#FF8C00] rounded-full" />
            </span>
            <h2 className="section-title">The SEVA1 Advantage</h2>
            <p className="section-subtitle">
              We deliver quality, reliability, and peace of mind
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#FF8C00]/30 shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-[#003366]" />
                </div>
                <h3 className="text-lg font-semibold text-[#003366] mb-3 group-hover:text-[#FF8C00] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8C00]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#003366]/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-[#FF8C00] font-semibold text-sm mb-4">
              <span className="w-8 h-0.5 bg-[#FF8C00] rounded-full" />
              Testimonials
              <span className="w-8 h-0.5 bg-[#FF8C00] rounded-full" />
            </span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Join thousands of satisfied customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#FF8C00] text-[#FF8C00]" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
                
                {/* Service Tag */}
                <div className="mb-6">
                  <span className="text-xs font-medium bg-[#003366]/5 text-[#003366] px-3 py-1 rounded-full">
                    {testimonial.service}
                  </span>
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#003366]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download CTA Section */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#003366] via-[#004080] to-[#0066cc]" />
        <div className="absolute inset-0 hero-pattern-grid opacity-20" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#FF8C00]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Download the SEVA1 App Today
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Book services on the go, track your bookings, and get exclusive app-only offers. Available on iOS and Android.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 transition-colors hover:scale-105 hover:-translate-y-1">
                  <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-white/60">Download on the</p>
                    <p className="font-semibold text-white text-lg">App Store</p>
                  </div>
                </button>
                
                <button className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 transition-colors hover:scale-105 hover:-translate-y-1">
                  <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xs text-white/60">Get it on</p>
                    <p className="font-semibold text-white text-lg">Google Play</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative">
                {/* Phone Mockup */}
                <div className="w-72 h-[500px] bg-white/10 rounded-[3rem] backdrop-blur-sm border border-white/20 p-3">
                  <div className="w-full h-full bg-gradient-to-br from-[#003366] to-[#FF8C00] rounded-[2.5rem] flex items-center justify-center">
                    <Wrench className="w-24 h-24 text-white/30" />
                  </div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-strong animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#003366]">4.8 Rating</p>
                      <p className="text-xs text-gray-500">10K+ Reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-to-br from-[#003366] via-[#004080] to-[#003366] rounded-3xl p-10 md:p-16 text-center text-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8C00]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Need Help? We&apos;re Here for You!
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto text-lg">
                Our customer support team is available 24/7 to assist you with any queries or concerns.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-[#003366] hover:bg-white/90 gap-2 h-14 px-8 text-base font-semibold">
                  <a href="tel:+919876543210">
                    <Phone className="w-5 h-5" />
                    Call Us: +91 98765 43210
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#003366] gap-2 h-14 px-8 text-base font-semibold">
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
