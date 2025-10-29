import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mockTenant } from "@/lib/mock-tenant";

export async function middleware(request: NextRequest) {
  const host = request.nextUrl.hostname;

  // Skip middleware for localhost and internal Next.js requests
  if (
    host === "localhost" ||
    host.startsWith("127.0.0.1") ||
    host.includes("vercel.app")
  ) {
    // For localhost, use mock tenant data
    const response = NextResponse.next();
    response.headers.set("x-tenant-id", mockTenant.id);
    response.headers.set("x-tenant-name", encodeURIComponent(mockTenant.name));
    response.headers.set("x-tenant-domain", mockTenant.domain);
    response.headers.set("x-tenant-logo", mockTenant.logoUrl || "");
    response.headers.set("x-tenant-theme", mockTenant.theme || "light");
    response.headers.set(
      "x-tenant-primary-color",
      mockTenant.primaryColor || "#3B82F6"
    );
    response.headers.set(
      "x-tenant-secondary-color",
      mockTenant.secondaryColor || "#1E40AF"
    );
    return response;
  }

  try {
    // Look up tenant by domain
    const tenant = await prisma.tenant.findUnique({
      where: { domain: host },
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

    if (!tenant) {
      // Redirect to not found page if tenant doesn't exist
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    // Add tenant information to request headers
    const response = NextResponse.next();
    response.headers.set("x-tenant-id", tenant.id);
    response.headers.set("x-tenant-name", tenant.name);
    response.headers.set("x-tenant-domain", tenant.domain);
    response.headers.set("x-tenant-logo", tenant.logoUrl || "");
    response.headers.set("x-tenant-theme", tenant.theme || "light");
    response.headers.set(
      "x-tenant-primary-color",
      tenant.primaryColor || "#3B82F6"
    );
    response.headers.set(
      "x-tenant-secondary-color",
      tenant.secondaryColor || "#1E40AF"
    );

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    // Fallback to mock tenant for development
    const response = NextResponse.next();
    response.headers.set("x-tenant-id", mockTenant.id);
    response.headers.set("x-tenant-name", encodeURIComponent(mockTenant.name));
    response.headers.set("x-tenant-domain", mockTenant.domain);
    response.headers.set("x-tenant-logo", mockTenant.logoUrl || "");
    response.headers.set("x-tenant-theme", mockTenant.theme || "light");
    response.headers.set(
      "x-tenant-primary-color",
      mockTenant.primaryColor || "#3B82F6"
    );
    response.headers.set(
      "x-tenant-secondary-color",
      mockTenant.secondaryColor || "#1E40AF"
    );
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
