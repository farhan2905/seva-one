import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ServiceType } from '@prisma/client';

// GET /api/services/[id] - Get a single service
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const service = await db.service.findUnique({
      where: { id },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

// PUT /api/services/[id] - Update a service
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // Check if service exists
    const existing = await db.service.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Check if product exists if productId is provided
    if (productId) {
      const product = await db.product.findUnique({
        where: { id: productId },
      });
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 400 }
        );
      }
    }

    // Check if new slug conflicts with another service
    if (slug && slug !== existing.slug) {
      const slugConflict = await db.service.findUnique({
        where: { slug },
      });
      if (slugConflict) {
        return NextResponse.json(
          { error: 'Service with this slug already exists' },
          { status: 400 }
        );
      }
    }

    const service = await db.service.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price: price !== undefined ? parseFloat(price) : undefined,
        discountedPrice:
          discountedPrice !== undefined
            ? discountedPrice
              ? parseFloat(discountedPrice)
              : null
            : undefined,
        duration: duration !== undefined ? parseInt(duration) : undefined,
        serviceType: serviceType as ServiceType,
        warranty,
        productId,
        isActive,
        sortOrder,
      },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id] - Delete a service
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if service exists
    const existing = await db.service.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    await db.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
