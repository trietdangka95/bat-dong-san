import Button from "../Button";
import Link from "next/link";
import { vietnameseText } from "@/lib/text-utils";

interface PropertyCardProps {
  id: string | number;
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  price: string;
  image: string;
}

const PropertyCard = ({
  id,
  title,
  location,
  bedrooms,
  bathrooms,
  area,
  price,
  image,
}: PropertyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Property Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Property Details */}
        <div className="space-y-2 mb-4">
          {/* Location */}
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-red-500 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate">{location}</span>
          </div>

          {/* Bedrooms */}
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0"
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
            <span>
              {vietnameseText.bedrooms}: {bedrooms}
            </span>
          </div>

          {/* Bathrooms */}
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0"
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
            <span>
              {vietnameseText.bathrooms}: {bathrooms}
            </span>
          </div>

          {/* Area */}
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0"
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
            <span>
              {vietnameseText.area}: {area}
            </span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="space-y-3 mt-auto">
          <div className="text-lg font-bold text-gray-800 break-words">
            {price}
          </div>
          <Link href={`/products/${id}`}>
            <Button variant="primary" size="lg" className="w-full">
              {vietnameseText.viewNow}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
