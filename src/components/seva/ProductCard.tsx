'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Wrench, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  categorySlug: string;
  serviceCount?: number;
}

export default function ProductCard({
  name,
  slug,
  description,
  categorySlug,
  serviceCount,
}: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`}>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden card-premium"
      >
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brand to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Image Placeholder */}
        <div className="relative h-40 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand/8 via-white to-accent/8" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 51, 102, 0.03) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              whileHover={{ scale: 1.15, rotate: 10 }}
              className="w-20 h-20 rounded-2xl bg-white shadow-soft flex items-center justify-center border border-gray-50"
            >
              <Wrench className="w-10 h-10 text-brand/30 group-hover:text-accent/50 transition-colors" />
            </motion.div>
          </div>
          
          {/* Service Count Badge */}
          {serviceCount !== undefined && serviceCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-soft"
            >
              <span className="text-xs font-semibold text-brand">{serviceCount} services</span>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-brand group-hover:text-accent transition-colors duration-300 mb-2">
            {name}
          </h3>

          {description && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
              {description}
            </p>
          )}

          {/* View Services Link */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-50 group-hover:border-gray-100 transition-colors">
            <span className="text-sm text-gray-400">View Details</span>
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-1 text-brand group-hover:text-accent transition-colors"
            >
              <span className="text-sm font-medium">Explore</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
