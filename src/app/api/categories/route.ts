import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/categories - Get all categories
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeProducts = searchParams.get('includeProducts') === 'true';
    const activeOnly = searchParams.get('activeOnly') !== 'false';

    const categories = await db.category.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      include: includeProducts
        ? {
            products: {
              where: activeOnly ? { isActive: true } : undefined,
              include: {
                services: {
                  where: activeOnly ? { isActive: true } : undefined,
                },
              },
            },
          }
        : undefined,
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, imageUrl, icon, isActive, sortOrder } = body;

    // Check if slug already exists
    const existing = await db.category.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      );
    }

    const category = await db.category.create({
      data: {
        name,
        slug,
        description,
        imageUrl,
        icon,
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
