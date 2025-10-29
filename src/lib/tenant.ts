import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { mockTenant } from "@/lib/mock-tenant";

export interface TenantData {
  id: string;
  name: string;
  domain: string;
  logoUrl?: string;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  config?: any;
}

export async function getTenantFromHeaders(): Promise<TenantData | null> {
  try {
    const headersList = headers();
    const tenantId = headersList.get("x-tenant-id");

    if (!tenantId) {
      return null;
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
        return tenant;
      }
    } catch (dbError) {
      console.log("Database not available, using mock data:", dbError);
    }

    // Fallback to mock data
    return mockTenant;
  } catch (error) {
    console.error("Error getting tenant from headers:", error);
    return mockTenant;
  }
}

export async function getTenantByDomain(
  domain: string
): Promise<TenantData | null> {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { domain },
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

    return tenant;
  } catch (error) {
    console.error("Error getting tenant by domain:", error);
    return null;
  }
}
