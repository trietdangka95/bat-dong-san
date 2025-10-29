import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mockTenant } from "@/lib/mock-tenant";

export async function GET(request: NextRequest) {
  try {
    const tenantId = request.headers.get("x-tenant-id");

    if (!tenantId) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
    }

    // Try to fetch from database, fallback to mock data
    try {
      const tenant = await prisma.tenant.findUnique({
        where: { id: tenantId },
        select: {
          id: true,
          name: true,
          domain: true,
          logoUrl: true,
          theme: true,
          primaryColor: true,
          secondaryColor: true,
          config: true,
        },
      });

      if (tenant) {
        return NextResponse.json(tenant);
      }
    } catch (dbError) {
      console.log("Database not available, using mock data:", dbError);
    }

    // Fallback to mock data
    return NextResponse.json(mockTenant);
  } catch (error) {
    console.error("Error fetching tenant:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
