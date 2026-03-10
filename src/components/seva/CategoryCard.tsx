'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, 
  Sparkles, 
  Droplets, 
  Zap, 
  Wrench,
  Wind,
  Refrigerator,
  UtensilsCrossed,
  Bath,
  Flame,
  Lightbulb,
  Gauge,
  ChevronRight
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Sparkles,
  Droplets,
  Zap,
  Wrench,
  Wind,
  Refrigerator,
  UtensilsCrossed,
  Bath,
  Flame,
  Lightbulb,
  Gauge,
};

interface CategoryCardProps {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  productCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function CategoryCard({
  name,
  slug,
  description,
  icon = 'Home',
  productCount,
  size = 'md',
}: CategoryCardProps) {
  const IconComponent = iconMap[icon] || Home;

  const sizeClasses = {
    sm: 'p-5',
    md: 'p-6',
    lg: 'p-8',
  };

  const iconSizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-18 h-18',
  };

  return (
    <Link href={`/categories/${slug}`} className="block">
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative bg-white rounded-2xl border border-gray-100 overflow-hidden card-premium ${sizeClasses[size]}`}
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brand to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Background Gradient on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative">
          {/* Icon */}
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className={`${iconSizeClasses[size]} rounded-xl flex items-center justify-center mb-5 transition-all duration-300`}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 51, 102, 0.1) 0%, rgba(255, 140, 0, 0.08) 100%)'
            }}
          >
            <IconComponent 
              className={`${size === 'lg' ? 'w-9 h-9' : size === 'md' ? 'w-7 h-7' : 'w-6 h-6'} text-brand group-hover:text-accent transition-colors duration-300`}
            />
          </motion.div>

          {/* Name */}
          <h3 className={`font-semibold text-brand group-hover:text-accent transition-colors duration-300 mb-2 ${size === 'lg' ? 'text-xl' : 'text-lg'}`}>
            {name}
          </h3>

          {/* Description */}
          {description && size !== 'sm' && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
              {description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 group-hover:border-gray-100 transition-colors">
            {productCount !== undefined && (
              <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                {productCount} {productCount === 1 ? 'service' : 'services'}
              </span>
            )}
            <motion.div
              whileHover={{ x: 4 }}
              className="flex items-center gap-1 text-brand group-hover:text-accent transition-colors ml-auto"
            >
              <span className="text-sm font-medium">Explore</span>
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
