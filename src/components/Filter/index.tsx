"use client";

import { useState } from "react";
import Button from "../Button";

interface FilterProps {
  onFilter: (filters: FilterData) => void;
  onReset: () => void;
}

interface FilterData {
  title: string;
  address: string;
  priceMin: string;
  priceMax: string;
  areaMin: string;
  areaMax: string;
  propertyType: string;
}

const Filter = ({ onFilter, onReset }: FilterProps) => {
  const [filters, setFilters] = useState<FilterData>({
    title: "",
    address: "",
    priceMin: "",
    priceMax: "",
    areaMin: "",
    areaMax: "",
    propertyType: "",
  });

  const propertyTypes = [
    { value: "", label: "Tất cả loại" },
    { value: "Căn hộ", label: "Căn hộ" },
    { value: "Biệt thự", label: "Biệt thự" },
    { value: "Chung cư", label: "Chung cư" },
    { value: "Nhà phố", label: "Nhà phố" },
    { value: "Văn phòng", label: "Văn phòng" },
  ];

  const handleInputChange = (field: keyof FilterData, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      title: "",
      address: "",
      priceMin: "",
      priceMax: "",
      areaMin: "",
      areaMax: "",
      propertyType: "",
    });
    onReset();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Bộ lọc tìm kiếm</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Title Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên dự án
            </label>
            <input
              type="text"
              value={filters.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Nhập tên dự án..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Address Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            <input
              type="text"
              value={filters.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Nhập địa chỉ..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Property Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại bất động sản
            </label>
            <select
              value={filters.propertyType}
              onChange={(e) =>
                handleInputChange("propertyType", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá từ (triệu VNĐ)
            </label>
            <input
              type="number"
              value={filters.priceMin}
              onChange={(e) => handleInputChange("priceMin", e.target.value)}
              placeholder="Giá tối thiểu..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá đến (triệu VNĐ)
            </label>
            <input
              type="number"
              value={filters.priceMax}
              onChange={(e) => handleInputChange("priceMax", e.target.value)}
              placeholder="Giá tối đa..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Area Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diện tích từ (m²)
            </label>
            <input
              type="number"
              value={filters.areaMin}
              onChange={(e) => handleInputChange("areaMin", e.target.value)}
              placeholder="Diện tích tối thiểu..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diện tích đến (m²)
            </label>
            <input
              type="number"
              value={filters.areaMax}
              onChange={(e) => handleInputChange("areaMax", e.target.value)}
              placeholder="Diện tích tối đa..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="flex-1 sm:flex-none"
          >
            Tìm kiếm
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleReset}
            className="flex-1 sm:flex-none"
          >
            Xóa bộ lọc
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Filter;
