// Static data extracted from seed - no database needed

export type ServiceType = 'Repair' | 'Maintenance' | 'Installation';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  icon: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice: number | null;
  duration: number;
  serviceType: ServiceType;
  warranty: string;
  productId: string;
  isActive: boolean;
  sortOrder: number;
}

// ─── Categories ──────────────────────────────────────────────

export const categories: Category[] = [
  {
    id: 'cat-home-appliances',
    name: 'Home Appliances',
    slug: 'home-appliances',
    description: 'Expert repair and maintenance services for all your home appliances including AC, Refrigerator, Washing Machine, and more.',
    imageUrl: '/images/appliances.jpg',
    icon: 'Home',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'cat-home-cleaning',
    name: 'Home Cleaning',
    slug: 'home-cleaning',
    description: 'Professional cleaning services for your home including deep cleaning, bathroom cleaning, kitchen cleaning, and more.',
    imageUrl: '/images/cleaning.jpg',
    icon: 'Sparkles',
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'cat-plumbing-services',
    name: 'Plumbing Services',
    slug: 'plumbing-services',
    description: 'Complete plumbing solutions from leak repairs to bathroom fittings, pipe installation, and drainage services.',
    imageUrl: '/images/plumbing.jpg',
    icon: 'Droplets',
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'cat-electrical-services',
    name: 'Electrical Services',
    slug: 'electrical-services',
    description: 'Licensed electricians for all your electrical needs including wiring, repairs, installations, and safety inspections.',
    imageUrl: '/images/electrical.jpg',
    icon: 'Zap',
    isActive: true,
    sortOrder: 4,
  },
];

// ─── Products ────────────────────────────────────────────────

export const products: Product[] = [
  // Home Appliances
  { id: 'prod-air-conditioner', name: 'Air Conditioner', slug: 'air-conditioner', description: 'Complete AC services including installation, repair, gas refill, and regular maintenance for all brands and types.', imageUrl: '/images/ac.jpg', categoryId: 'cat-home-appliances', isActive: true, sortOrder: 1 },
  { id: 'prod-refrigerator', name: 'Refrigerator', slug: 'refrigerator', description: 'Professional refrigerator repair and maintenance services for single door, double door, and side-by-side models.', imageUrl: '/images/fridge.jpg', categoryId: 'cat-home-appliances', isActive: true, sortOrder: 2 },
  { id: 'prod-washing-machine', name: 'Washing Machine', slug: 'washing-machine', description: 'Expert washing machine services for top load, front load, and semi-automatic models of all major brands.', imageUrl: '/images/washing-machine.jpg', categoryId: 'cat-home-appliances', isActive: true, sortOrder: 3 },
  { id: 'prod-microwave', name: 'Microwave', slug: 'microwave', description: 'Microwave repair and maintenance services including heating issues, turntable problems, and electrical faults.', imageUrl: '/images/microwave.jpg', categoryId: 'cat-home-appliances', isActive: true, sortOrder: 4 },
  // Home Cleaning
  { id: 'prod-full-home-deep-cleaning', name: 'Full Home Deep Cleaning', slug: 'full-home-deep-cleaning', description: 'Comprehensive deep cleaning service for your entire home including all rooms, bathrooms, and kitchen.', imageUrl: '/images/deep-cleaning.jpg', categoryId: 'cat-home-cleaning', isActive: true, sortOrder: 1 },
  { id: 'prod-bathroom-cleaning', name: 'Bathroom Cleaning', slug: 'bathroom-cleaning', description: 'Professional bathroom cleaning and sanitization services for sparkling clean and hygienic bathrooms.', imageUrl: '/images/bathroom-cleaning.jpg', categoryId: 'cat-home-cleaning', isActive: true, sortOrder: 2 },
  { id: 'prod-kitchen-cleaning', name: 'Kitchen Cleaning', slug: 'kitchen-cleaning', description: 'Thorough kitchen cleaning including chimney, stove, countertops, and deep cleaning of all surfaces.', imageUrl: '/images/kitchen-cleaning.jpg', categoryId: 'cat-home-cleaning', isActive: true, sortOrder: 3 },
  { id: 'prod-sofa-cleaning', name: 'Sofa Cleaning', slug: 'sofa-cleaning', description: 'Professional sofa and upholstery cleaning to remove stains, dirt, and allergens from your furniture.', imageUrl: '/images/sofa-cleaning.jpg', categoryId: 'cat-home-cleaning', isActive: true, sortOrder: 4 },
  // Plumbing
  { id: 'prod-leak-repair', name: 'Leak Repair', slug: 'leak-repair', description: 'Quick and effective leak detection and repair services for pipes, faucets, and water tanks.', imageUrl: '/images/leak-repair.jpg', categoryId: 'cat-plumbing-services', isActive: true, sortOrder: 1 },
  { id: 'prod-bathroom-fittings', name: 'Bathroom Fittings', slug: 'bathroom-fittings', description: 'Installation and repair of bathroom fittings including taps, showers, commodes, and basins.', imageUrl: '/images/bathroom-fittings.jpg', categoryId: 'cat-plumbing-services', isActive: true, sortOrder: 2 },
  { id: 'prod-water-heater', name: 'Water Heater', slug: 'water-heater', description: 'Complete water heater services including installation, repair, and maintenance of geysers.', imageUrl: '/images/water-heater.jpg', categoryId: 'cat-plumbing-services', isActive: true, sortOrder: 3 },
  { id: 'prod-drain-cleaning', name: 'Drain Cleaning', slug: 'drain-cleaning', description: 'Professional drain cleaning and unclogging services for kitchen sinks, bathrooms, and main drains.', imageUrl: '/images/drain-cleaning.jpg', categoryId: 'cat-plumbing-services', isActive: true, sortOrder: 4 },
  // Electrical
  { id: 'prod-wiring-rewiring', name: 'Wiring & Rewiring', slug: 'wiring-rewiring', description: 'Complete electrical wiring solutions for new construction and rewiring for existing buildings.', imageUrl: '/images/wiring.jpg', categoryId: 'cat-electrical-services', isActive: true, sortOrder: 1 },
  { id: 'prod-fan-installation', name: 'Fan Installation', slug: 'fan-installation', description: 'Professional installation, repair, and maintenance of ceiling fans, exhaust fans, and table fans.', imageUrl: '/images/fan-installation.jpg', categoryId: 'cat-electrical-services', isActive: true, sortOrder: 2 },
  { id: 'prod-light-fittings', name: 'Light Fittings', slug: 'light-fittings', description: 'Installation and repair of all types of light fittings including LED, tube lights, and decorative lights.', imageUrl: '/images/light-fittings.jpg', categoryId: 'cat-electrical-services', isActive: true, sortOrder: 3 },
  { id: 'prod-mcb-fuse', name: 'MCB & Fuse', slug: 'mcb-fuse', description: 'Installation and replacement of MCB, fuses, and electrical safety devices.', imageUrl: '/images/mcb-fuse.jpg', categoryId: 'cat-electrical-services', isActive: true, sortOrder: 4 },
];

// ─── Services ────────────────────────────────────────────────

export const services: Service[] = [
  // AC Services
  { id: 'svc-ac-half-service', name: 'AC Half Service', slug: 'ac-half-service', description: 'Basic AC service including indoor unit cleaning, filter cleaning, and general inspection. Ideal for regular maintenance.', price: 599, discountedPrice: 499, duration: 45, serviceType: 'Maintenance', warranty: '30 days', productId: 'prod-air-conditioner', isActive: true, sortOrder: 1 },
  { id: 'svc-ac-full-service', name: 'AC Full Service', slug: 'ac-full-service', description: 'Complete AC service including indoor and outdoor unit cleaning, gas pressure check, coil cleaning, and performance optimization.', price: 1299, discountedPrice: 999, duration: 90, serviceType: 'Maintenance', warranty: '90 days', productId: 'prod-air-conditioner', isActive: true, sortOrder: 2 },
  { id: 'svc-ac-gas-refill', name: 'AC Gas Refill', slug: 'ac-gas-refill', description: 'Professional AC gas refill service with leak detection and pressure testing. Includes up to 1.5 kg refrigerant.', price: 1999, discountedPrice: 1699, duration: 60, serviceType: 'Repair', warranty: '60 days', productId: 'prod-air-conditioner', isActive: true, sortOrder: 3 },
  { id: 'svc-ac-installation', name: 'AC Installation', slug: 'ac-installation', description: 'Professional split AC installation including wall mounting, pipe fitting, electrical connection, and testing.', price: 1499, discountedPrice: 1199, duration: 120, serviceType: 'Installation', warranty: '1 year', productId: 'prod-air-conditioner', isActive: true, sortOrder: 4 },
  { id: 'svc-ac-uninstallation', name: 'AC Uninstallation', slug: 'ac-uninstallation', description: 'Safe AC uninstallation including gas recovery, dismantling, and proper packing for relocation.', price: 799, discountedPrice: 599, duration: 60, serviceType: 'Repair', warranty: 'N/A', productId: 'prod-air-conditioner', isActive: true, sortOrder: 5 },
  // Refrigerator Services
  { id: 'svc-refrigerator-basic-service', name: 'Refrigerator Basic Service', slug: 'refrigerator-basic-service', description: 'Basic refrigerator service including cleaning, thermostat check, and general inspection.', price: 499, discountedPrice: 399, duration: 45, serviceType: 'Maintenance', warranty: '30 days', productId: 'prod-refrigerator', isActive: true, sortOrder: 1 },
  { id: 'svc-refrigerator-gas-refill', name: 'Refrigerator Gas Refill', slug: 'refrigerator-gas-refill', description: 'Complete gas refill service with leak detection and pressure testing for optimal cooling.', price: 1799, discountedPrice: 1499, duration: 90, serviceType: 'Repair', warranty: '90 days', productId: 'prod-refrigerator', isActive: true, sortOrder: 2 },
  { id: 'svc-refrigerator-compressor-repair', name: 'Refrigerator Compressor Repair', slug: 'refrigerator-compressor-repair', description: 'Compressor diagnosis, repair, or replacement with genuine parts and warranty.', price: 3499, discountedPrice: 2999, duration: 180, serviceType: 'Repair', warranty: '1 year', productId: 'prod-refrigerator', isActive: true, sortOrder: 3 },
  // Washing Machine Services
  { id: 'svc-washing-machine-basic-service', name: 'Washing Machine Basic Service', slug: 'washing-machine-basic-service', description: 'Basic service including drum cleaning, filter cleaning, and inspection.', price: 449, discountedPrice: 349, duration: 45, serviceType: 'Maintenance', warranty: '30 days', productId: 'prod-washing-machine', isActive: true, sortOrder: 1 },
  { id: 'svc-washing-machine-repair', name: 'Washing Machine Repair', slug: 'washing-machine-repair', description: 'Comprehensive repair service for motor, drum, belt, and electrical issues.', price: 899, discountedPrice: 699, duration: 90, serviceType: 'Repair', warranty: '90 days', productId: 'prod-washing-machine', isActive: true, sortOrder: 2 },
  { id: 'svc-washing-machine-installation', name: 'Washing Machine Installation', slug: 'washing-machine-installation', description: 'Professional installation including water connection, drain setup, and testing.', price: 599, discountedPrice: 449, duration: 60, serviceType: 'Installation', warranty: '6 months', productId: 'prod-washing-machine', isActive: true, sortOrder: 3 },
  // Microwave Services
  { id: 'svc-microwave-inspection', name: 'Microwave Inspection', slug: 'microwave-inspection', description: 'Complete microwave inspection and cleaning service.', price: 349, discountedPrice: 249, duration: 30, serviceType: 'Maintenance', warranty: '30 days', productId: 'prod-microwave', isActive: true, sortOrder: 1 },
  { id: 'svc-microwave-repair', name: 'Microwave Repair', slug: 'microwave-repair', description: 'Repair service for heating issues, turntable problems, and control panel faults.', price: 799, discountedPrice: 599, duration: 60, serviceType: 'Repair', warranty: '90 days', productId: 'prod-microwave', isActive: true, sortOrder: 2 },
  // Deep Cleaning Services
  { id: 'svc-1-bhk-deep-cleaning', name: '1 BHK Deep Cleaning', slug: '1-bhk-deep-cleaning', description: 'Complete deep cleaning for 1 BHK apartment including all rooms, kitchen, and bathrooms.', price: 3499, discountedPrice: 2999, duration: 300, serviceType: 'Maintenance', warranty: '7 days', productId: 'prod-full-home-deep-cleaning', isActive: true, sortOrder: 1 },
  { id: 'svc-2-bhk-deep-cleaning', name: '2 BHK Deep Cleaning', slug: '2-bhk-deep-cleaning', description: 'Complete deep cleaning for 2 BHK apartment including all rooms, kitchen, and bathrooms.', price: 4499, discountedPrice: 3999, duration: 420, serviceType: 'Maintenance', warranty: '7 days', productId: 'prod-full-home-deep-cleaning', isActive: true, sortOrder: 2 },
  { id: 'svc-3-bhk-deep-cleaning', name: '3 BHK Deep Cleaning', slug: '3-bhk-deep-cleaning', description: 'Complete deep cleaning for 3 BHK apartment including all rooms, kitchen, and bathrooms.', price: 5499, discountedPrice: 4999, duration: 540, serviceType: 'Maintenance', warranty: '7 days', productId: 'prod-full-home-deep-cleaning', isActive: true, sortOrder: 3 },
  // Bathroom Cleaning Services
  { id: 'svc-single-bathroom-cleaning', name: 'Single Bathroom Cleaning', slug: 'single-bathroom-cleaning', description: 'Professional cleaning and sanitization for a single bathroom.', price: 599, discountedPrice: 449, duration: 60, serviceType: 'Maintenance', warranty: '7 days', productId: 'prod-bathroom-cleaning', isActive: true, sortOrder: 1 },
  { id: 'svc-two-bathroom-cleaning', name: 'Two Bathroom Cleaning', slug: 'two-bathroom-cleaning', description: 'Professional cleaning and sanitization for two bathrooms.', price: 999, discountedPrice: 799, duration: 120, serviceType: 'Maintenance', warranty: '7 days', productId: 'prod-bathroom-cleaning', isActive: true, sortOrder: 2 },
  // Leak Repair Services
  { id: 'svc-tap-leak-repair', name: 'Tap Leak Repair', slug: 'tap-leak-repair', description: 'Quick repair for leaking taps and faucets. Includes parts replacement if needed.', price: 299, discountedPrice: 199, duration: 30, serviceType: 'Repair', warranty: '30 days', productId: 'prod-leak-repair', isActive: true, sortOrder: 1 },
  { id: 'svc-pipe-leak-repair', name: 'Pipe Leak Repair', slug: 'pipe-leak-repair', description: 'Professional pipe leak detection and repair for all types of pipes.', price: 499, discountedPrice: 399, duration: 45, serviceType: 'Repair', warranty: '60 days', productId: 'prod-leak-repair', isActive: true, sortOrder: 2 },
  // Fan Installation Services
  { id: 'svc-ceiling-fan-installation', name: 'Ceiling Fan Installation', slug: 'ceiling-fan-installation', description: 'Professional ceiling fan installation including mounting and electrical connection.', price: 449, discountedPrice: 349, duration: 45, serviceType: 'Installation', warranty: '6 months', productId: 'prod-fan-installation', isActive: true, sortOrder: 1 },
  { id: 'svc-ceiling-fan-repair', name: 'Ceiling Fan Repair', slug: 'ceiling-fan-repair', description: 'Repair service for ceiling fan including capacitor replacement, bearing repair, and balancing.', price: 349, discountedPrice: 249, duration: 30, serviceType: 'Repair', warranty: '30 days', productId: 'prod-fan-installation', isActive: true, sortOrder: 2 },
  // Light Fitting Services
  { id: 'svc-led-light-installation', name: 'LED Light Installation', slug: 'led-light-installation', description: 'Professional LED light installation for homes and offices.', price: 199, discountedPrice: 149, duration: 20, serviceType: 'Installation', warranty: '6 months', productId: 'prod-light-fittings', isActive: true, sortOrder: 1 },
  { id: 'svc-tube-light-installation', name: 'Tube Light Installation', slug: 'tube-light-installation', description: 'Tube light installation including holder fitting and electrical connection.', price: 249, discountedPrice: 199, duration: 25, serviceType: 'Installation', warranty: '6 months', productId: 'prod-light-fittings', isActive: true, sortOrder: 2 },
];

// ─── Helper functions ────────────────────────────────────────

export function getCategories() {
  return categories.filter(c => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCategoryBySlug(slug: string) {
  return categories.find(c => c.slug === slug && c.isActive) || null;
}

export function getProductsByCategory(categoryId: string) {
  return products.filter(p => p.categoryId === categoryId && p.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug && p.isActive) || null;
}

export function getServicesByProduct(productId: string) {
  return services.filter(s => s.productId === productId && s.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getServiceBySlug(slug: string) {
  return services.find(s => s.slug === slug && s.isActive) || null;
}

export function getServiceById(id: string) {
  return services.find(s => s.id === id && s.isActive) || null;
}

export function getFeaturedServices(limit = 4) {
  return services
    .filter(s => s.isActive && s.discountedPrice !== null)
    .sort((a, b) => (b.discountedPrice || 0) - (a.discountedPrice || 0))
    .slice(0, limit);
}

export function getCategoryForProduct(productId: string) {
  const product = products.find(p => p.id === productId);
  if (!product) return null;
  return categories.find(c => c.id === product.categoryId) || null;
}

export function getProductForService(serviceId: string) {
  const service = services.find(s => s.id === serviceId);
  if (!service) return null;
  return products.find(p => p.id === service.productId) || null;
}
