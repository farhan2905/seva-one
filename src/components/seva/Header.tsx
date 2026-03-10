'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Phone, 
  Search,
  ChevronDown,
  Home,
  Sparkles,
  Droplets,
  Zap,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
  { name: 'Home Appliances', slug: 'home-appliances', icon: Home, description: 'AC, Fridge, Washing Machine & more' },
  { name: 'Home Cleaning', slug: 'home-cleaning', icon: Sparkles, description: 'Deep cleaning, Bathroom & Kitchen' },
  { name: 'Plumbing Services', slug: 'plumbing-services', icon: Droplets, description: 'Leaks, Fittings & Water Heaters' },
  { name: 'Electrical Services', slug: 'electrical-services', icon: Zap, description: 'Wiring, Fans & Light Fittings' },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-medium' : ''}`}>
      <div className="glass-nav">
        <div className="container mx-auto px-4">
          <div className="flex h-18 items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
                  <div className="relative">
                    <Shield className="w-7 h-7 text-white" />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">S1</span>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 border-2 border-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-brand tracking-tight">SEVA<span className="text-accent">1</span></span>
                <span className="text-[10px] text-gray-400 tracking-wider uppercase hidden sm:block">Service Excellence</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Services Dropdown */}
              <div 
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-brand transition-colors"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    >
                      <div className="bg-white rounded-2xl shadow-strong border border-gray-100 p-4 w-[600px] grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/categories/${category.slug}`}
                            onClick={() => setIsServicesOpen(false)}
                            className="group/card flex items-center gap-4 p-4 rounded-xl hover:bg-brand-50 transition-all"
                          >
                            <motion.div 
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="w-12 h-12 rounded-xl icon-container"
                            >
                              <category.icon className="w-6 h-6 text-brand" />
                            </motion.div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-brand group-hover/card:text-brand transition-colors">
                                {category.name}
                              </div>
                              <p className="line-clamp-1 text-xs text-gray-500 mt-0.5">
                                {category.description}
                              </p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-300 rotate-[-90deg] group-hover/card:text-accent transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent rounded-full group-hover:w-3/4 transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="hidden md:block overflow-hidden"
                  >
                    <Input
                      type="search"
                      placeholder="Search services..."
                      className="w-72 input-premium"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex text-gray-600 hover:text-brand hover:bg-brand-50"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Phone Number */}
              <a
                href="tel:+919876543210"
                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-50/80 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">24/7 Support</span>
                  <span className="text-sm font-semibold text-brand group-hover:text-accent transition-colors">+91 98765 43210</span>
                </div>
              </a>

              {/* CTA Button */}
              <Button asChild className="hidden sm:flex btn-accent shadow-accent">
                <Link href="/categories">
                  <span>Book Now</span>
                </Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-600 hover:text-brand hover:bg-brand-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-b border-gray-100 shadow-soft"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col gap-6">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search services..."
                    className="w-full pl-12 input-premium"
                  />
                </div>

                {/* Categories */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-8 h-0.5 bg-accent rounded-full" />
                    Our Services
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.slug}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={`/categories/${category.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 hover:border-accent hover:shadow-soft transition-all group"
                        >
                          <div className="w-10 h-10 rounded-lg icon-container">
                            <category.icon className="w-5 h-5 text-brand" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 group-hover:text-brand transition-colors">{category.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-medium text-gray-600 hover:text-brand py-3 px-4 rounded-xl hover:bg-brand-50 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* CTA */}
                <Button asChild className="w-full btn-accent shadow-accent h-12 text-base">
                  <Link href="/categories" onClick={() => setIsMenuOpen(false)}>
                    Book a Service Now
                  </Link>
                </Button>

                {/* Phone */}
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-3 py-3 rounded-xl bg-brand-50"
                >
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="text-sm font-semibold text-brand">+91 98765 43210</span>
                  <span className="text-xs text-gray-500">(24/7 Support)</span>
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
