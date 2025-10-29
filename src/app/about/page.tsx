import { getTenantFromHeaders } from "@/lib/tenant";
import { TenantProvider } from "@/contexts/TenantContext";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedButton from "@/components/ThemedButton";

export default async function AboutPage() {
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
                  >
                    Sản phẩm
                  </a>
                  <a
                    href="/about"
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                    style={{ color: tenant.primaryColor }}
                  >
                    Giới thiệu
                  </a>
                </nav>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section
            className="py-20"
            style={{
              background: `linear-gradient(135deg, ${tenant.primaryColor}10, ${tenant.secondaryColor}10)`,
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Giới thiệu về {tenant.name}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {tenant.config?.description ||
                  "Chúng tôi là đối tác đáng tin cậy trong lĩnh vực bất động sản, cam kết mang đến những sản phẩm và dịch vụ tốt nhất cho khách hàng."}
              </p>
            </div>
          </section>

          {/* About Content */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Tầm nhìn & Sứ mệnh
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Tầm nhìn
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Trở thành công ty bất động sản hàng đầu, được khách hàng
                        tin tưởng và lựa chọn trong việc đầu tư và mua bán bất
                        động sản tại khu vực.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Sứ mệnh
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Mang đến cho khách hàng những sản phẩm bất động sản chất
                        lượng cao, dịch vụ chuyên nghiệp và trải nghiệm tuyệt
                        vời trong quá trình giao dịch.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="About us"
                      className="w-full h-96 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Giá trị cốt lõi
                </h2>
                <p className="text-lg text-gray-600">
                  Những nguyên tắc định hướng hoạt động của chúng tôi
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Chất lượng
                  </h3>
                  <p className="text-gray-600">
                    Cam kết mang đến những sản phẩm bất động sản chất lượng cao,
                    đáp ứng mọi nhu cầu của khách hàng.
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Chuyên nghiệp
                  </h3>
                  <p className="text-gray-600">
                    Đội ngũ nhân viên giàu kinh nghiệm, chuyên nghiệp và tận tâm
                    trong việc tư vấn và hỗ trợ khách hàng.
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Tin cậy
                  </h3>
                  <p className="text-gray-600">
                    Xây dựng mối quan hệ lâu dài dựa trên sự tin tưởng, minh
                    bạch và cam kết thực hiện đúng những gì đã hứa.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Liên hệ với chúng tôi
                </h2>
                <p className="text-lg text-gray-600">
                  Hãy để chúng tôi hỗ trợ bạn tìm kiếm bất động sản phù hợp
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Địa chỉ
                  </h3>
                  <p className="text-gray-600">
                    {tenant.config?.contact?.address ||
                      "Ấp 11, Xã Thủ Thừa, Tỉnh Tây Ninh"}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Điện thoại
                  </h3>
                  <p className="text-gray-600">
                    {tenant.config?.contact?.phone || "0962 123 xxx"}
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: tenant.primaryColor }}
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Email
                  </h3>
                  <p className="text-gray-600">
                    {tenant.config?.contact?.email || "batdongsan49@gmail.com"}
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <ThemedButton variant="primary" size="lg">
                  Liên hệ tư vấn ngay
                </ThemedButton>
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
