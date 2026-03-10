import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ServiceType } from '@prisma/client';

// GET /api/services - Get all services
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');
    const categoryId = searchParams.get('categoryId');
    const serviceType = searchParams.get('serviceType') as ServiceType | null;
    const includeProduct = searchParams.get('includeProduct') === 'true';
    const activeOnly = searchParams.get('activeOnly') !== 'false';
    const featured = searchParams.get('featured') === 'true';
    const limit = searchParams.get('limit');

    const services = await db.service.findMany({
      where: {
        ...(activeOnly ? { isActive: true } : {}),
        ...(productId ? { productId } : {}),
        ...(serviceType ? { serviceType } : {}),
        ...(categoryId
          ? {
              product: {
                categoryId,
              },
            }
          : {}),
      },
      include: {
        product: includeProduct
          ? {
              include: {
                category: true,
              },
            }
          : undefined,
      },
      orderBy: featured ? { discountedPrice: 'desc' } : { sortOrder: 'asc' },
      ...(limit ? { take: parseInt(limit) } : {}),
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      discountedPrice,
      duration,
      serviceType,
      warranty,
      productId,
      isActive,
      sortOrder,
    } = body;

    // Check if product exists
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await db.service.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Service with this slug already exists' },
        { status: 400 }
      );
    }

    const service = await db.service.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        discountedPrice: discountedPrice ? parseFloat(discountedPrice) : null,
        duration: parseInt(duration),
        serviceType: serviceType as ServiceType,
        warranty,
        productId,
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
