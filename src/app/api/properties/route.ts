import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mockProperties } from "@/lib/mock-tenant";

export async function GET(request: NextRequest) {
  try {
    const tenantId = request.headers.get("x-tenant-id");

    // If tenantId missing (e.g., client-side fetch), fallback to mock data for dev

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const propertyType = searchParams.get("propertyType") || "";
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const areaMin = searchParams.get("areaMin");
    const areaMax = searchParams.get("areaMax");

    // Try to fetch from database, fallback to mock data
    if (!tenantId) {
      // Fallback path when no tenant header is present
      let filteredProperties = mockProperties;

      if (search) {
        filteredProperties = filteredProperties.filter(
          (property) =>
            property.title.toLowerCase().includes(search.toLowerCase()) ||
            property.address.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (propertyType) {
        filteredProperties = filteredProperties.filter((property) =>
          property.propertyType
            .toLowerCase()
            .includes(propertyType.toLowerCase())
        );
      }

      if (priceMin || priceMax) {
        filteredProperties = filteredProperties.filter((property) => {
          const priceInMillions = property.price / 1000000;
          if (priceMin && priceInMillions < parseInt(priceMin)) return false;
          if (priceMax && priceInMillions > parseInt(priceMax)) return false;
          return true;
        });
      }

      const total = filteredProperties.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProperties = filteredProperties.slice(
        startIndex,
        endIndex
      );

      return NextResponse.json({
        properties: paginatedProperties,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    }

    try {
      // Build where clause with tenant isolation
      const where: any = {
        tenantId,
        isActive: true,
      };

      // Add search filters
      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { address: { contains: search, mode: "insensitive" } },
        ];
      }

      if (propertyType) {
        where.propertyType = { contains: propertyType, mode: "insensitive" };
      }

      if (priceMin || priceMax) {
        where.price = {};
        if (priceMin) where.price.gte = parseInt(priceMin) * 1000000; // Convert to VND
        if (priceMax) where.price.lte = parseInt(priceMax) * 1000000; // Convert to VND
      }

      const [properties, total] = await Promise.all([
        prisma.property.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.property.count({ where }),
      ]);

      return NextResponse.json({
        properties,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (dbError) {
      console.log("Database not available, using mock data:", dbError);

      // Fallback to mock data with basic filtering
      let filteredProperties = mockProperties;

      if (search) {
        filteredProperties = filteredProperties.filter(
          (property) =>
            property.title.toLowerCase().includes(search.toLowerCase()) ||
            property.address.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (propertyType) {
        filteredProperties = filteredProperties.filter((property) =>
          property.propertyType
            .toLowerCase()
            .includes(propertyType.toLowerCase())
        );
      }

      if (priceMin || priceMax) {
        filteredProperties = filteredProperties.filter((property) => {
          const priceInMillions = property.price / 1000000;
          if (priceMin && priceInMillions < parseInt(priceMin)) return false;
          if (priceMax && priceInMillions > parseInt(priceMax)) return false;
          return true;
        });
      }

      const total = filteredProperties.length;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProperties = filteredProperties.slice(
        startIndex,
        endIndex
      );

      return NextResponse.json({
        properties: paginatedProperties,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const tenantId = request.headers.get("x-tenant-id");

    if (!tenantId) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
    }

    const body = await request.json();
    const {
      title,
      price,
      address,
      description,
      bedrooms,
      bathrooms,
      area,
      propertyType,
      imageUrl,
    } = body;

    const property = await prisma.property.create({
      data: {
        title,
        price: parseInt(price),
        address,
        description,
        bedrooms: parseInt(bedrooms) || 0,
        bathrooms: parseInt(bathrooms) || 0,
        area,
        propertyType,
        imageUrl,
        tenantId,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
