import Link from "next/link";
import Banner from "../Banner";
import Button from "../Button";

const Header = () => {
  return (
    <>
      {/* Header Navigation */}
      <header className="w-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg fixed top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3 ">
                {/* House Icon */}
                <div className="flex items-center justify-center">
                  <img
                    src="/dung_logo.png"
                    alt="Tiến Dũng BĐS Logo"
                    width={200}
                    height={100}
                  />
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Sản phẩm
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Giới thiệu
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="flex items-center">
              <Button
                variant="secondary"
                size="md"
                className="flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
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
                <span>Liên hệ tư vấn</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Banner Section */}
      <Banner />
    </>
  );
};

export default Header;
