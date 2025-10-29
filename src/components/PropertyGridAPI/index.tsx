"use client";

import { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard";
import Button from "../Button";
import Filter from "../Filter";
import { useTenant } from "@/contexts/TenantContext";

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  description?: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  propertyType: string;
  imageUrl?: string;
  createdAt: string;
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

const PropertyGridAPI = () => {
  const { tenant } = useTenant();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/properties");
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data = await response.json();
      setProperties(data.properties);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (filters: FilterData) => {
    const filtered = properties.filter((property) => {
      // Filter by title
      if (
        filters.title &&
        !property.title.toLowerCase().includes(filters.title.toLowerCase())
      ) {
        return false;
      }

      // Filter by address
      if (
        filters.address &&
        !property.address.toLowerCase().includes(filters.address.toLowerCase())
      ) {
        return false;
      }

      // Filter by property type
      if (
        filters.propertyType &&
        !property.propertyType
          .toLowerCase()
          .includes(filters.propertyType.toLowerCase())
      ) {
        return false;
      }

      // Filter by price range
      const priceValue = property.price / 1000000; // Convert to millions
      if (filters.priceMin && priceValue < parseFloat(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && priceValue > parseFloat(filters.priceMax)) {
        return false;
      }

      // Filter by area range
      const areaValue = parseFloat(property.area.replace(/[^\d]/g, ""));
      if (filters.areaMin && areaValue < parseFloat(filters.areaMin)) {
        return false;
      }
      if (filters.areaMax && areaValue > parseFloat(filters.areaMax)) {
        return false;
      }

      return true;
    });

    setFilteredProperties(filtered);
    setIsFiltered(true);
  };

  const handleResetFilter = () => {
    setFilteredProperties([]);
    setIsFiltered(false);
  };

  const displayProperties = isFiltered ? filteredProperties : properties;

  const formatPrice = (price: number) => {
    return `${price.toLocaleString("vi-VN")} đồng`;
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-lg text-gray-600">Đang tải dữ liệu...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-4">Lỗi: {error}</div>
            <Button variant="primary" size="md" onClick={fetchProperties}>
              Thử lại
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-red-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-3xl font-bold text-gray-800">
              Bất động sản {tenant?.name}
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Khám phá những dự án bất động sản tốt nhất
          </p>
        </div>

        {/* Filter Component */}
        <Filter onFilter={handleFilter} onReset={handleResetFilter} />

        {/* Property Grid */}
        {displayProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                location={property.address}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                price={formatPrice(property.price)}
                image={
                  property.imageUrl ||
                  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              Không tìm thấy bất động sản nào phù hợp với bộ lọc
            </div>
            <Button variant="outline" size="md" onClick={handleResetFilter}>
              Xóa bộ lọc
            </Button>
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="secondary" size="lg">
            Xem thêm dự án
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyGridAPI;
