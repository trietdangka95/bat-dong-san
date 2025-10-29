"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../Button";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-xl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                  Đăng ký nhận thông tin từ chúng tôi
                </h3>
                <p className="text-blue-200 text-lg">
                  Chúng tôi sẽ gửi bạn những thông tin bất động sản mới nhất
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Information */}
            <div className="lg:col-span-1">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img
                    src="/dung_logo.png"
                    alt="Tiến Dũng BĐS Logo"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">TIẾN DŨNG BĐS</h2>
                  <p className="text-sm text-blue-200">THE KEYS TO YOUR HOME</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-blue-200">
                    Địa chỉ: Ấp 11, Xã Thủ Thừa , Tỉnh Tây Ninh (Long An Cũ)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-green-400 flex-shrink-0"
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
                  <span className="text-blue-200">Điện thoại: 0976537267</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400 flex-shrink-0"
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
                  <span className="text-blue-200">
                    Email: tiendung11cdmt@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* About Us */}
            <div>
              <h3 className="text-lg font-bold mb-4">Về chúng tôi</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Latest Projects */}
            <div>
              <h3 className="text-lg font-bold mb-4">Dự án mới nhất</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/apartment"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Căn hộ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/townhouse"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Nhà phố
                  </Link>
                </li>
                <li>
                  <Link
                    href="/villa"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Biệt thự
                  </Link>
                </li>
                <li>
                  <Link
                    href="/condominium"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Chung cư
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies & Regulations */}
            <div>
              <h3 className="text-lg font-bold mb-4">Chính sách & Quy định</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/sales-policy"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Chính sách bán hàng
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Điều khoản sử dụng
                  </Link>
                </li>
                <li>
                  <Link
                    href="/process"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Quy trình mua bán
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    Câu hỏi thường gặp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
