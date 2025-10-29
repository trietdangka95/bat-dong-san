// Utility functions to handle Vietnamese text encoding
export const vietnameseText = {
  // Navigation
  home: "Trang chủ",
  products: "Sản phẩm",
  about: "Giới thiệu",

  // Property details
  bedrooms: "Phòng ngủ",
  bathrooms: "Phòng tắm",
  area: "Diện tích",
  price: "Giá bán",
  propertyType: "Loại BĐS",
  description: "Mô tả",

  // Actions
  viewNow: "Xem ngay",
  contact: "Liên hệ tư vấn",
  favorite: "Yêu thích",

  // About page
  vision: "Tầm nhìn",
  mission: "Sứ mệnh",
  coreValues: "Giá trị cốt lõi",
  quality: "Chất lượng",
  professional: "Chuyên nghiệp",
  trustworthy: "Tin cậy",

  // Contact
  address: "Địa chỉ",
  phone: "Điện thoại",
  email: "Email",

  // Common
  notFound: "Không tìm thấy",
  loading: "Đang tải...",
  error: "Lỗi",
  retry: "Thử lại",
} as const;

// Function to safely encode Vietnamese text
export function safeEncode(text: string): string {
  try {
    return encodeURIComponent(text);
  } catch (error) {
    console.warn("Encoding error:", error);
    return text;
  }
}

// Function to safely decode Vietnamese text
export function safeDecode(text: string): string {
  try {
    return decodeURIComponent(text);
  } catch (error) {
    console.warn("Decoding error:", error);
    return text;
  }
}
