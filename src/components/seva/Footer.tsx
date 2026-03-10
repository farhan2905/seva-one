'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  Shield,
  ArrowRight,
  Heart
} from 'lucide-react';

const footerLinks = {
  services: [
    { name: 'Home Appliances', href: '/categories/home-appliances' },
    { name: 'Home Cleaning', href: '/categories/home-cleaning' },
    { name: 'Plumbing Services', href: '/categories/plumbing-services' },
    { name: 'Electrical Services', href: '/categories/electrical-services' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001a33] via-[#003366] to-[#004080]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Main Footer */}
      <div className="relative container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                <div className="relative">
                  <Shield className="w-8 h-8 text-white" />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">S1</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-tight">SEVA<span className="text-accent">1</span></span>
                <span className="text-[10px] text-white/50 tracking-wider uppercase">Service Excellence</span>
              </div>
            </Link>

            <p className="text-white/70 mb-8 max-w-md leading-relaxed">
              SEVA1 is your trusted partner for all home services. We connect you with verified professionals for quality service at your doorstep.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-white/50">24/7 Support</p>
                  <span className="font-medium">+91 98765 43210</span>
                </div>
              </a>
              <a
                href="mailto:support@seva1.com"
                className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Email us</p>
                  <span className="font-medium">support@seva1.com</span>
                </div>
              </a>
              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Location</p>
                  <span className="font-medium">Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-8">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-accent flex items-center justify-center transition-colors border border-white/10 hover:border-accent/50"
                >
                  <social.icon className="w-5 h-5 text-white" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full" />
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-accent opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full" />
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-accent opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full" />
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 text-accent opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-white text-xl font-semibold mb-2">Download Our App</h3>
              <p className="text-white/60">Book services on the go with exclusive app-only offers</p>
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20 transition-colors"
              >
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/50 uppercase tracking-wide">Download on the</p>
                  <p className="text-sm font-semibold text-white">App Store</p>
                </div>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20 transition-colors"
              >
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-white/50 uppercase tracking-wide">Get it on</p>
                  <p className="text-sm font-semibold text-white">Google Play</p>
                </div>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p className="flex items-center gap-1">
              © {new Date().getFullYear()} SEVA1. Made with <Heart className="w-4 h-4 text-accent fill-accent" /> in India
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
