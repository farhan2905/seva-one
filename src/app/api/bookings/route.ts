import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/bookings - Get all bookings
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const serviceId = searchParams.get('serviceId');
    const includeService = searchParams.get('includeService') === 'true';

    const bookings = await db.booking.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(serviceId ? { serviceId } : {}),
      },
      include: {
        service: includeService
          ? {
              include: {
                product: {
                  include: {
                    category: true,
                  },
                },
              },
            }
          : undefined,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      serviceId,
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      pincode,
      scheduledAt,
      notes,
    } = body;

    // Check if service exists
    const service = await db.service.findUnique({
      where: { id: serviceId },
      include: {
        product: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 400 }
      );
    }

    const booking = await db.booking.create({
      data: {
        serviceId,
        customerName,
        customerEmail,
        customerPhone,
        address,
        city,
        pincode,
        scheduledAt: new Date(scheduledAt),
        notes,
      },
      include: {
        service: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
