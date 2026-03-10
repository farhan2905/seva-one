'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Shield, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  discountedPrice?: number | null;
  duration: number;
  serviceType: string;
  warranty?: string | null;
  productSlug: string;
  categorySlug: string;
}

export default function ServiceCard({
  id,
  name,
  slug,
  description,
  price,
  discountedPrice,
  duration,
  serviceType,
  warranty,
  productSlug,
  categorySlug,
}: ServiceCardProps) {
  const discount = discountedPrice
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

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
    <motion.div
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden card-premium"
    >
      {/* Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brand to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Service Type Badge */}
      <div className="relative p-5 pb-0">
        <div className="flex items-center justify-between">
          <span
            className={
              serviceType === 'Installation'
                ? 'service-type-installation'
                : serviceType === 'Maintenance'
                ? 'service-type-maintenance'
                : 'service-type-repair'
            }
          >
            {serviceType}
          </span>
          {discount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="badge-discount"
            >
              {discount}% OFF
            </motion.span>
          )}
        </div>
      </div>

      <div className="p-5 pt-4">
        {/* Service Name */}
        <Link href={`/services/${slug}`}>
          <h3 className="text-lg font-semibold text-brand group-hover:text-accent transition-colors duration-300 mb-2 line-clamp-1">
            {name}
          </h3>
        </Link>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {/* Duration & Warranty */}
        <div className="flex items-center gap-4 mb-5 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-accent" />
            <span>{formatDuration(duration)}</span>
          </div>
          {warranty && warranty !== 'N/A' && (
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-green-500" />
              <span>{warranty}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 mb-5">
          {discountedPrice ? (
            <>
              <span className="price-discounted">
                {formatPrice(discountedPrice)}
              </span>
              <span className="price-original">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="price-current">
              {formatPrice(price)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button asChild className="flex-1 btn-accent shadow-accent h-11">
            <Link href={`/book/${id}`}>Book Now</Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="h-11 w-11 border-gray-200 hover:border-accent hover:text-accent">
            <Link href={`/services/${slug}`}>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
