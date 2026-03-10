import { PrismaClient, ServiceType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Home Appliances',
        slug: 'home-appliances',
        description: 'Expert repair and maintenance services for all your home appliances including AC, Refrigerator, Washing Machine, and more.',
        imageUrl: '/images/appliances.jpg',
        icon: 'Home',
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Home Cleaning',
        slug: 'home-cleaning',
        description: 'Professional cleaning services for your home including deep cleaning, bathroom cleaning, kitchen cleaning, and more.',
        imageUrl: '/images/cleaning.jpg',
        icon: 'Sparkles',
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Plumbing Services',
        slug: 'plumbing-services',
        description: 'Complete plumbing solutions from leak repairs to bathroom fittings, pipe installation, and drainage services.',
        imageUrl: '/images/plumbing.jpg',
        icon: 'Droplets',
        isActive: true,
        sortOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Electrical Services',
        slug: 'electrical-services',
        description: 'Licensed electricians for all your electrical needs including wiring, repairs, installations, and safety inspections.',
        imageUrl: '/images/electrical.jpg',
        icon: 'Zap',
        isActive: true,
        sortOrder: 4,
      },
    }),
  ]);

  console.log('Created categories:', categories.length);

  // Create Products under Home Appliances
  const homeAppliances = categories.find(c => c.slug === 'home-appliances')!;
  
  const applianceProducts = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Air Conditioner',
        slug: 'air-conditioner',
        description: 'Complete AC services including installation, repair, gas refill, and regular maintenance for all brands and types.',
        imageUrl: '/images/ac.jpg',
        categoryId: homeAppliances.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Refrigerator',
        slug: 'refrigerator',
        description: 'Professional refrigerator repair and maintenance services for single door, double door, and side-by-side models.',
        imageUrl: '/images/fridge.jpg',
        categoryId: homeAppliances.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Washing Machine',
        slug: 'washing-machine',
        description: 'Expert washing machine services for top load, front load, and semi-automatic models of all major brands.',
        imageUrl: '/images/washing-machine.jpg',
        categoryId: homeAppliances.id,
        isActive: true,
        sortOrder: 3,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Microwave',
        slug: 'microwave',
        description: 'Microwave repair and maintenance services including heating issues, turntable problems, and electrical faults.',
        imageUrl: '/images/microwave.jpg',
        categoryId: homeAppliances.id,
        isActive: true,
        sortOrder: 4,
      },
    }),
  ]);

  // Create Products under Home Cleaning
  const homeCleaning = categories.find(c => c.slug === 'home-cleaning')!;
  
  const cleaningProducts = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Full Home Deep Cleaning',
        slug: 'full-home-deep-cleaning',
        description: 'Comprehensive deep cleaning service for your entire home including all rooms, bathrooms, and kitchen.',
        imageUrl: '/images/deep-cleaning.jpg',
        categoryId: homeCleaning.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Bathroom Cleaning',
        slug: 'bathroom-cleaning',
        description: 'Professional bathroom cleaning and sanitization services for sparkling clean and hygienic bathrooms.',
        imageUrl: '/images/bathroom-cleaning.jpg',
        categoryId: homeCleaning.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Kitchen Cleaning',
        slug: 'kitchen-cleaning',
        description: 'Thorough kitchen cleaning including chimney, stove, countertops, and deep cleaning of all surfaces.',
        imageUrl: '/images/kitchen-cleaning.jpg',
        categoryId: homeCleaning.id,
        isActive: true,
        sortOrder: 3,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Sofa Cleaning',
        slug: 'sofa-cleaning',
        description: 'Professional sofa and upholstery cleaning to remove stains, dirt, and allergens from your furniture.',
        imageUrl: '/images/sofa-cleaning.jpg',
        categoryId: homeCleaning.id,
        isActive: true,
        sortOrder: 4,
      },
    }),
  ]);

  // Create Products under Plumbing
  const plumbing = categories.find(c => c.slug === 'plumbing-services')!;
  
  const plumbingProducts = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Leak Repair',
        slug: 'leak-repair',
        description: 'Quick and effective leak detection and repair services for pipes, faucets, and water tanks.',
        imageUrl: '/images/leak-repair.jpg',
        categoryId: plumbing.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Bathroom Fittings',
        slug: 'bathroom-fittings',
        description: 'Installation and repair of bathroom fittings including taps, showers, commodes, and basins.',
        imageUrl: '/images/bathroom-fittings.jpg',
        categoryId: plumbing.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Water Heater',
        slug: 'water-heater',
        description: 'Complete water heater services including installation, repair, and maintenance of geysers.',
        imageUrl: '/images/water-heater.jpg',
        categoryId: plumbing.id,
        isActive: true,
        sortOrder: 3,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Drain Cleaning',
        slug: 'drain-cleaning',
        description: 'Professional drain cleaning and unclogging services for kitchen sinks, bathrooms, and main drains.',
        imageUrl: '/images/drain-cleaning.jpg',
        categoryId: plumbing.id,
        isActive: true,
        sortOrder: 4,
      },
    }),
  ]);

  // Create Products under Electrical
  const electrical = categories.find(c => c.slug === 'electrical-services')!;
  
  const electricalProducts = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Wiring & Rewiring',
        slug: 'wiring-rewiring',
        description: 'Complete electrical wiring solutions for new construction and rewiring for existing buildings.',
        imageUrl: '/images/wiring.jpg',
        categoryId: electrical.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Fan Installation',
        slug: 'fan-installation',
        description: 'Professional installation, repair, and maintenance of ceiling fans, exhaust fans, and table fans.',
        imageUrl: '/images/fan-installation.jpg',
        categoryId: electrical.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Light Fittings',
        slug: 'light-fittings',
        description: 'Installation and repair of all types of light fittings including LED, tube lights, and decorative lights.',
        imageUrl: '/images/light-fittings.jpg',
        categoryId: electrical.id,
        isActive: true,
        sortOrder: 3,
      },
    }),
    prisma.product.create({
      data: {
        name: 'MCB & Fuse',
        slug: 'mcb-fuse',
        description: 'Installation and replacement of MCB, fuses, and electrical safety devices.',
        imageUrl: '/images/mcb-fuse.jpg',
        categoryId: electrical.id,
        isActive: true,
        sortOrder: 4,
      },
    }),
  ]);

  console.log('Created products:', applianceProducts.length + cleaningProducts.length + plumbingProducts.length + electricalProducts.length);

  // Create Services for AC
  const ac = applianceProducts.find(p => p.slug === 'air-conditioner')!;
  
  await Promise.all([
    prisma.service.create({
      data: {
        name: 'AC Half Service',
        slug: 'ac-half-service',
        description: 'Basic AC service including indoor unit cleaning, filter cleaning, and general inspection. Ideal for regular maintenance.',
        price: 599,
        discountedPrice: 499,
        duration: 45,
        serviceType: ServiceType.Maintenance,
        warranty: '30 days',
        productId: ac.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        name: 'AC Full Service',
        slug: 'ac-full-service',
        description: 'Complete AC service including indoor and outdoor unit cleaning, gas pressure check, coil cleaning, and performance optimization.',
        price: 1299,
        discountedPrice: 999,
        duration: 90,
        serviceType: ServiceType.Maintenance,
        warranty: '90 days',
        productId: ac.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.service.create({
      data: {
        name: 'AC Gas Refill',
        slug: 'ac-gas-refill',
        description: 'Professional AC gas refill service with leak detection and pressure testing. Includes up to 1.5 kg refrigerant.',
        price: 1999,
        discountedPrice: 1699,
        duration: 60,
        serviceType: ServiceType.Repair,
        warranty: '60 days',
        productId: ac.id,
        isActive: true,
        sortOrder: 3,
      },
    }),
    prisma.service.create({
      data: {
        name: 'AC Installation',
        slug: 'ac-installation',
        description: 'Professional split AC installation including wall mounting, pipe fitting, electrical connection, and testing.',
        price: 1499,
        discountedPrice: 1199,
        duration: 120,
        serviceType: ServiceType.Installation,
        warranty: '1 year',
        productId: ac.id,
        isActive: true,
        sortOrder: 4,
      },
    }),
    prisma.service.create({
      data: {
        name: 'AC Uninstallation',
        slug: 'ac-uninstallation',
        description: 'Safe AC uninstallation including gas recovery, dismantling, and proper packing for relocation.',
        price: 799,
        discountedPrice: 599,
        duration: 60,
        serviceType: ServiceType.Repair,
        warranty: 'N/A',
        productId: ac.id,
        isActive: true,
        sortOrder: 5,
      },
    }),
  ]);

  // Create Services for Refrigerator
  const refrigerator = applianceProducts.find(p => p.slug === 'refrigerator')!;
  
  await Promise.all([
    prisma.service.create({
      data: {
        name: 'Refrigerator Basic Service',
        slug: 'refrigerator-basic-service',
        description: 'Basic refrigerator service including cleaning, thermostat check, and general inspection.',
        price: 499,
        discountedPrice: 399,
        duration: 45,
        serviceType: ServiceType.Maintenance,
        warranty: '30 days',
        productId: refrigerator.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Refrigerator Gas Refill',
        slug: 'refrigerator-gas-refill',
        description: 'Complete gas refill service with leak detection and pressure testing for optimal cooling.',
        price: 1799,
        discountedPrice: 1499,
        duration: 90,
        serviceType: ServiceType.Repair,
        warranty: '90 days',
        productId: refrigerator.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Refrigerator Compressor Repair',
        slug: 'refrigerator-compressor-repair',
        description: 'Compressor diagnosis, repair, or replacement with genuine parts and warranty.',
        price: 3499,
        discountedPrice: 2999,
        duration: 180,
        serviceType: ServiceType.Repair,
        warranty: '1 year',
        productId: refrigerator.id,
        isActive: true,
        sortOrder: 3,
      },
    }),
  ]);

  // Create Services for Washing Machine
  const washingMachine = applianceProducts.find(p => p.slug === 'washing-machine')!;
  
  await Promise.all([
    prisma.service.create({
      data: {
        name: 'Washing Machine Basic Service',
        slug: 'washing-machine-basic-service',
        description: 'Basic service including drum cleaning, filter cleaning, and inspection.',
        price: 449,
        discountedPrice: 349,
        duration: 45,
        serviceType: ServiceType.Maintenance,
        warranty: '30 days',
        productId: washingMachine.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Washing Machine Repair',
        slug: 'washing-machine-repair',
        description: 'Comprehensive repair service for motor, drum, belt, and electrical issues.',
        price: 899,
        discountedPrice: 699,
        duration: 90,
        serviceType: ServiceType.Repair,
        warranty: '90 days',
        productId: washingMachine.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Washing Machine Installation',
        slug: 'washing-machine-installation',
        description: 'Professional installation including water connection, drain setup, and testing.',
        price: 599,
        discountedPrice: 449,
        duration: 60,
        serviceType: ServiceType.Installation,
        warranty: '6 months',
        productId: washingMachine.id,
        isActive: true,
        sortOrder: 3,
      },
    }),
  ]);

  // Create Services for Microwave
  const microwave = applianceProducts.find(p => p.slug === 'microwave')!;
  
  await Promise.all([
    prisma.service.create({
      data: {
        name: 'Microwave Inspection',
        slug: 'microwave-inspection',
        description: 'Complete microwave inspection and cleaning service.',
        price: 349,
        discountedPrice: 249,
        duration: 30,
        serviceType: ServiceType.Maintenance,
        warranty: '30 days',
        productId: microwave.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Microwave Repair',
        slug: 'microwave-repair',
        description: 'Repair service for heating issues, turntable problems, and control panel faults.',
        price: 799,
        discountedPrice: 599,
        duration: 60,
        serviceType: ServiceType.Repair,
        warranty: '90 days',
        productId: microwave.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
  ]);

  // Create Services for Full Home Deep Cleaning
  const deepCleaning = cleaningProducts.find(p => p.slug === 'full-home-deep-cleaning')!;
  
  await Promise.all([
    prisma.service.create({
      data: {
        name: '1 BHK Deep Cleaning',
        slug: '1-bhk-deep-cleaning',
        description: 'Complete deep cleaning for 1 BHK apartment including all rooms, kitchen, and bathrooms.',
        price: 3499,
        discountedPrice: 2999,
        duration: 300,
        serviceType: ServiceType.Maintenance,
        warranty: '7 days',
        productId: deepCleaning.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        name: '2 BHK Deep Cleaning',
        slug: '2-bhk-deep-cleaning',
        description: 'Complete deep cleaning for 2 BHK apartment including all rooms, kitchen, and bathrooms.',
        price: 4499,
        discountedPrice: 3999,
        duration: 420,
        serviceType: ServiceType.Maintenance,
        warranty: '7 days',
        productId: deepCleaning.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.service.create({
      data: {
        name: '3 BHK Deep Cleaning',
        slug: '3-bhk-deep-cleaning',
        description: 'Complete deep cleaning for 3 BHK apartment including all rooms, kitchen, and bathrooms.',
        price: 5499,
        discountedPrice: 4999,
        duration: 540,
        serviceType: ServiceType.Maintenance,
        warranty: '7 days',
        productId: deepCleaning.id,
        isActive: true,
        sortOrder: 3,
      },
    }),
  ]);

  // Create Services for Bathroom Cleaning
  const bathroomCleaning = cleaningProducts.find(p => p.slug === 'bathroom-cleaning')!;
  
  await Promise.all([
    prisma.service.create({
      data: {
        name: 'Single Bathroom Cleaning',
        slug: 'single-bathroom-cleaning',
        description: 'Professional cleaning and sanitization for a single bathroom.',
        price: 599,
        discountedPrice: 449,
        duration: 60,
        serviceType: ServiceType.Maintenance,
        warranty: '7 days',
        productId: bathroomCleaning.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Two Bathroom Cleaning',
        slug: 'two-bathroom-cleaning',
        description: 'Professional cleaning and sanitization for two bathrooms.',
        price: 999,
        discountedPrice: 799,
        duration: 120,
        serviceType: ServiceType.Maintenance,
        warranty: '7 days',
        productId: bathroomCleaning.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
  ]);

  // Create Services for Leak Repair
  const leakRepair = plumbingProducts.find(p => p.slug === 'leak-repair')!;
  
  await Promise.all([
    prisma.service.create({
      data: {
        name: 'Tap Leak Repair',
        slug: 'tap-leak-repair',
        description: 'Quick repair for leaking taps and faucets. Includes parts replacement if needed.',
        price: 299,
        discountedPrice: 199,
        duration: 30,
        serviceType: ServiceType.Repair,
        warranty: '30 days',
        productId: leakRepair.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Pipe Leak Repair',
        slug: 'pipe-leak-repair',
        description: 'Professional pipe leak detection and repair for all types of pipes.',
        price: 499,
        discountedPrice: 399,
        duration: 45,
        serviceType: ServiceType.Repair,
        warranty: '60 days',
        productId: leakRepair.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
  ]);

  // Create Services for Fan Installation
  const fanInstallation = electricalProducts.find(p => p.slug === 'fan-installation')!;
  
  await Promise.all([
    prisma.service.create({
      data: {
        name: 'Ceiling Fan Installation',
        slug: 'ceiling-fan-installation',
        description: 'Professional ceiling fan installation including mounting and electrical connection.',
        price: 449,
        discountedPrice: 349,
        duration: 45,
        serviceType: ServiceType.Installation,
        warranty: '6 months',
        productId: fanInstallation.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Ceiling Fan Repair',
        slug: 'ceiling-fan-repair',
        description: 'Repair service for ceiling fan including capacitor replacement, bearing repair, and balancing.',
        price: 349,
        discountedPrice: 249,
        duration: 30,
        serviceType: ServiceType.Repair,
        warranty: '30 days',
        productId: fanInstallation.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
  ]);

  // Create Services for Light Fittings
  const lightFittings = electricalProducts.find(p => p.slug === 'light-fittings')!;
  
  await Promise.all([
    prisma.service.create({
      data: {
        name: 'LED Light Installation',
        slug: 'led-light-installation',
        description: 'Professional LED light installation for homes and offices.',
        price: 199,
        discountedPrice: 149,
        duration: 20,
        serviceType: ServiceType.Installation,
        warranty: '6 months',
        productId: lightFittings.id,
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Tube Light Installation',
        slug: 'tube-light-installation',
        description: 'Tube light installation including holder fitting and electrical connection.',
        price: 249,
        discountedPrice: 199,
        duration: 25,
        serviceType: ServiceType.Installation,
        warranty: '6 months',
        productId: lightFittings.id,
        isActive: true,
        sortOrder: 2,
      },
    }),
  ]);

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
