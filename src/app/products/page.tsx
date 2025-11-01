import { getTenantFromHeaders } from "@/lib/tenant";
import { TenantProvider } from "@/contexts/TenantContext";
import ThemedLayout from "@/components/ThemedLayout";
import ProductsGridAPI from "@/components/ProductsGridAPI";
import Filter from "@/components/Filter";

export default async function ProductsPage() {
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

                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center space-x-8">
                  <a
                    href="/"
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Trang chủ
                  </a>
                  <a
                    href="/products"
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    style={{ color: tenant.primaryColor }}
                  >
                    Sản phẩm
                  </a>
                  <a
                    href="/about"
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Giới thiệu
                  </a>
                </nav>
              </div>
            </div>
          </header>

          {/* Page Header */}
          <section
            className="py-16"
            style={{
              background: `linear-gradient(135deg, ${tenant.primaryColor}10, ${tenant.secondaryColor}10)`,
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Danh sách sản phẩm
              </h1>
              <p className="text-lg text-gray-600">
                Khám phá tất cả các dự án bất động sản của {tenant.name}
              </p>
            </div>
          </section>

          {/* Properties Section - Different layout from home */}
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar filter */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-24">
                    <Filter onFilter={() => {}} onReset={() => {}} />
                  </div>
                </aside>
                {/* Grid */}
                <div className="lg:col-span-3">
                  <ProductsGridAPI />
                </div>
              </div>
            </div>
          </section>

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
              </div>
            </div>
          </footer>
        </div>
      </ThemedLayout>
    </TenantProvider>
  );
}
