import { getTenantFromHeaders } from "@/lib/tenant";
import { TenantProvider } from "@/contexts/TenantContext";
import ThemedLayout from "@/components/ThemedLayout";
import PropertyGridAPI from "@/components/PropertyGridAPI";
import ThemedButton from "@/components/ThemedButton";

export default async function TenantDemoPage() {
  const tenant = await getTenantFromHeaders();

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Tenant not found
          </h1>
          <p className="text-gray-600">
            Please access this page through a valid tenant domain.
          </p>
        </div>
      </div>
    );
  }

  return (
    <TenantProvider initialTenant={tenant}>
      <ThemedLayout>
        <div className="min-h-screen">
          {/* Header */}
          <header className="w-full shadow-lg border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                {/* Logo Section */}
                <div className="flex items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-20 h-20 flex items-center justify-center">
                      {tenant.logoUrl ? (
                        <img
                          src={tenant.logoUrl}
                          alt={`${tenant.name} Logo`}
                          width={100}
                          height={100}
                        />
                      ) : (
                        <div
                          className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                          style={{ backgroundColor: tenant.primaryColor }}
                        >
                          {tenant.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h1
                        className="text-2xl font-bold"
                        style={{ color: tenant.primaryColor }}
                      >
                        {tenant.name}
                      </h1>
                      <p className="text-sm text-gray-600">
                        Multi-tenant Real Estate Platform
                      </p>
                    </div>
                  </div>
                </div>

                {/* Theme Info */}
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    <div>Theme: {tenant.theme}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: tenant.primaryColor }}
                        title="Primary Color"
                      ></div>
                      <div
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: tenant.secondaryColor }}
                        title="Secondary Color"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Banner Section */}
          <section
            className="relative min-h-[30vh] flex items-center justify-center overflow-hidden pt-20"
            style={{
              background: `linear-gradient(135deg, ${tenant.primaryColor}20, ${tenant.secondaryColor}20)`,
            }}
          >
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 leading-tight">
                Welcome to {tenant.name}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your trusted real estate partner with personalized branding and
                theming
              </p>
              <ThemedButton variant="primary" size="lg">
                Explore Properties
              </ThemedButton>
            </div>
          </section>

          {/* Properties Section */}
          <PropertyGridAPI />

          {/* Footer */}
          <footer
            className="py-12"
            style={{
              backgroundColor: tenant.theme === "dark" ? "#1F2937" : "#F9FAFB",
              color: tenant.theme === "dark" ? "white" : "#374151",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{tenant.name}</h3>
                <p className="text-sm opacity-75">
                  Powered by Multi-tenant SaaS Platform
                </p>
                <div className="mt-4 text-xs opacity-50">
                  Tenant ID: {tenant.id} | Domain: {tenant.domain}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </ThemedLayout>
    </TenantProvider>
  );
}
