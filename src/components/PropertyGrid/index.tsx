"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PropertyCard from "../PropertyCard";
import Button from "../Button";
import Filter from "../Filter";

interface FilterData {
  title: string;
  address: string;
  priceMin: string;
  priceMax: string;
  areaMin: string;
  areaMax: string;
  propertyType: string;
}

const PropertyGrid = () => {
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const showAdvanced = searchParams.get("advanced") === "1";

  const properties = [
    {
      id: 1,
      title: "Chung cư Vinhomes Green Bay",
      location: "Số 7 Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội",
      bedrooms: 3,
      bathrooms: 2,
      area: "85m2",
      price: "3.900.000.000 đồng",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Biệt thự sân vườn sát sân bay Nội Bài",
      location: "Phường Phú Minh, Sóc Sơn, Hà Nội",
      bedrooms: 4,
      bathrooms: 3,
      area: "Trên 300m2",
      price: "8.500.000.000 đồng",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Căn hộ The Art",
      location: "Quận 2, TP. Hồ Chí Minh",
      bedrooms: 2,
      bathrooms: 2,
      area: "75m2",
      price: "2.800.000.000 đồng",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Biệt thự cao cấp Vinhomes Ocean Park",
      location: "Gia Lâm, Hà Nội",
      bedrooms: 5,
      bathrooms: 4,
      area: "250m2",
      price: "12.000.000.000 đồng",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Chung cư Masteri Centre Point",
      location: "Quận 4, TP. Hồ Chí Minh",
      bedrooms: 2,
      bathrooms: 2,
      area: "65m2",
      price: "2.200.000.000 đồng",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Căn hộ cao cấp The Sun Avenue",
      location: "Quận 7, TP. Hồ Chí Minh",
      bedrooms: 3,
      bathrooms: 2,
      area: "95m2",
      price: "4.500.000.000 đồng",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 7,
      title: "Biệt thự liền kề Vinhomes Smart City",
      location: "Nam Từ Liêm, Hà Nội",
      bedrooms: 4,
      bathrooms: 3,
      area: "180m2",
      price: "6.800.000.000 đồng",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 8,
      title: "Căn hộ Masteri An Phú",
      location: "Quận 2, TP. Hồ Chí Minh",
      bedrooms: 2,
      bathrooms: 2,
      area: "70m2",
      price: "2.500.000.000 đồng",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

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
        !property.location.toLowerCase().includes(filters.address.toLowerCase())
      ) {
        return false;
      }

      // Filter by property type
      if (
        filters.propertyType &&
        !property.title
          .toLowerCase()
          .includes(filters.propertyType.toLowerCase())
      ) {
        return false;
      }

      // Filter by price range
      const priceValue =
        parseFloat(property.price.replace(/[^\d]/g, "")) / 1000000; // Convert to millions
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
              Bất động sản nổi bật
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Khám phá những dự án bất động sản tốt nhất
          </p>
        </div>

        {/* Advanced Filter (toggle by banner button) */}
        {showAdvanced && (
          <Filter onFilter={handleFilter} onReset={handleResetFilter} />
        )}

        {/* Property Grid */}
        {displayProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                location={property.location}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                price={property.price}
                image={property.image}
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
        <div className="flex justify-center gap-3 mt-12">
          <Button variant="secondary" size="lg">
            Xem thêm dự án
          </Button>
          {showAdvanced && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.delete("advanced");
                router.push(url.pathname + (url.search ? url.search : ""));
              }}
            >
              Ẩn bộ lọc
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;
