"use client";

import { useState } from "react";
import Button from "../Button";

const Banner = () => {
  const [selectedCategory, setSelectedCategory] = useState("Biệt thự");

  const categories = [
    { name: "Biệt thự", icon: "🏡" },
    { name: "Căn hộ", icon: "🏢" },
    { name: "Chung cư", icon: "🏬" },
    { name: "Nhà phố", icon: "🏘️" },
    { name: "Văn phòng", icon: "🏢" },
  ];

  const propertyTypes = [
    { name: "Căn hộ", icon: "🏢" },
    { name: "Biệt thự", icon: "🏡" },
    { name: "Chung cư", icon: "🏬" },
    { name: "Nhà phố", icon: "🏘️" },
    { name: "Văn phòng", icon: "💼" },
  ];

  return (
    <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 py-8">
        {/* Main Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 md:mb-8 leading-tight">
          TRANG TIN BẤT ĐỘNG SẢN THỦ THỪA, TÂN AN, BẾN LỨC
        </h1>

        {/* Search Bar */}
        <div className="bg-white rounded-lg p-2 mb-8 md:mb-12 max-w-2xl mx-auto shadow-lg">
          <div className="flex flex-col md:flex-row gap-2">
            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
              >
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <input
              type="text"
              placeholder="Nhập dự án bạn đang quan tâm...."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="secondary" size="md" type="submit">
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
