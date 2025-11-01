"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

interface ApiProperty {
  id: string;
  title: string;
  price: number;
  address: string;
  imageUrl?: string;
  propertyType?: string;
}

export default function ProductsGridAPI() {
  const [properties, setProperties] = useState<ApiProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/properties");
        const json = await res.json();
        if (!res.ok)
          throw new Error(json?.error || "Failed to fetch properties");
        setProperties(json.properties || []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">Đang tải dữ liệu...</div>
    );
  if (error)
    return <div className="text-center py-10 text-red-500">Lỗi: {error}</div>;
  if (!properties.length)
    return (
      <div className="text-center py-10 text-gray-500">Chưa có sản phẩm.</div>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {properties.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          title={p.title}
          address={p.address}
          price={p.price}
          imageUrl={p.imageUrl}
          propertyType={p.propertyType}
        />
      ))}
    </div>
  );
}
