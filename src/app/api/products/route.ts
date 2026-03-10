import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryId = searchParams.get('categoryId');
    const includeServices = searchParams.get('includeServices') === 'true';
    const includeCategory = searchParams.get('includeCategory') === 'true';
    const activeOnly = searchParams.get('activeOnly') !== 'false';

    const products = await db.product.findMany({
      where: {
        ...(activeOnly ? { isActive: true } : {}),
        ...(categoryId ? { categoryId } : {}),
      },
      include: {
        category: includeCategory,
        services: includeServices
          ? {
              where: activeOnly ? { isActive: true } : undefined,
            }
          : undefined,
      },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, imageUrl, categoryId, isActive, sortOrder } = body;

    // Check if category exists
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await db.product.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Product with this slug already exists' },
        { status: 400 }
      );
    }

    const product = await db.product.create({
      data: {
        name,
        slug,
        description,
        imageUrl,
        categoryId,
        isActive: isActive ?? true,
        sortOrder: sortOrder ?? 0,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
