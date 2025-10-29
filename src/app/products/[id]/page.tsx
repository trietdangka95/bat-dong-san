import { getTenantFromHeaders } from "@/lib/tenant";
import { TenantProvider } from "@/contexts/TenantContext";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedButton from "@/components/ThemedButton";
import { mockProperties } from "@/lib/mock-tenant";

interface PropertyDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
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

  // Find property by ID (in real app, this would be a database query)
  const property = mockProperties.find((p) => p.id === params.id);

  if (!property) {
    return (
      <TenantProvider initialTenant={tenant}>
        <ThemedLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Sản phẩm không tìm thấy
              </h1>
              <p className="text-gray-600 mb-8">
                Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
              <ThemedButton variant="primary" size="lg">
                <a href="/products">Quay lại danh sách</a>
              </ThemedButton>
            </div>
          </div>
        </ThemedLayout>
      </TenantProvider>
    );
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString("vi-VN")} đồng`;
  };

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

          {/* Breadcrumb */}
          <div className="bg-gray-50 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                  <li>
                    <a href="/" className="text-gray-500 hover:text-gray-700">
                      Trang chủ
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <a
                        href="/products"
                        className="ml-4 text-gray-500 hover:text-gray-700"
                      >
                        Sản phẩm
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-4 text-gray-500 font-medium">
                        {property.title}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          {/* Property Detail Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Property Images */}
              <div className="space-y-4">
                <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{property.address}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div
                    className="text-3xl font-bold"
                    style={{ color: tenant.primaryColor }}
                  >
                    {formatPrice(property.price)}
                  </div>
                  <p className="text-gray-600 mt-2">Giá bán</p>
                </div>

                {/* Property Details */}
                <div className="grid grid-cols-2 gap-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <svg
                        className="w-6 h-6 text-gray-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                        />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {property.bedrooms}
                        </div>
                        <div className="text-sm text-gray-600">Phòng ngủ</div>
                      </div>
                    </div>
                  )}

                  {property.bathrooms > 0 && (
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <svg
                        className="w-6 h-6 text-gray-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {property.bathrooms}
                        </div>
                        <div className="text-sm text-gray-600">Phòng tắm</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {property.area}
                      </div>
                      <div className="text-sm text-gray-600">Diện tích</div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <svg
                      className="w-6 h-6 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {property.propertyType}
                      </div>
                      <div className="text-sm text-gray-600">Loại BĐS</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {property.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Mô tả
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <ThemedButton variant="primary" size="lg" className="flex-1">
                    Liên hệ tư vấn
                  </ThemedButton>
                  <ThemedButton variant="outline" size="lg" className="flex-1">
                    Yêu thích
                  </ThemedButton>
                </div>
              </div>
            </div>
          </div>

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
