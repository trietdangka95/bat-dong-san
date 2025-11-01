import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  address: string;
  price: number;
  imageUrl?: string;
  propertyType?: string;
}

export default function ProductCard({
  id,
  title,
  address,
  price,
  imageUrl,
  propertyType,
}: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
        <Image
          src={imageUrl || "/placeholder-property.jpg"}
          alt={title}
          fill
          className="object-cover"
        />
        {propertyType && (
          <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
            {propertyType}
          </span>
        )}
      </div>
      <div className="p-3">
        <Link href={`/products/${id}`} className="block">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[40px]">
            {title}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 line-clamp-1 mt-1">{address}</p>
        <div className="text-base font-bold text-gray-900 mt-2">
          {new Intl.NumberFormat("vi-VN").format(price)} đồng
        </div>
      </div>
    </div>
  );
}
