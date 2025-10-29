// Mock tenant data for development when database is not available
export const mockTenant = {
  id: "mock-tenant-id",
  name: "Tiến Dũng BĐS",
  domain: "tiendung.localhost",
  logoUrl: "/dung_logo.png",
  theme: "light",
  primaryColor: "#3B82F6",
  secondaryColor: "#1E40AF",
  config: {
    description: "Chuyên nghiệp về bất động sản tại Thủ Thừa, Long An",
    contact: {
      phone: "0962 123 xxx",
      email: "batdongsan49@gmail.com",
      address: "Ấp 11, Xã Thủ Thừa, Tỉnh Tây Ninh (Long An Cũ)",
    },
  },
};

export const mockProperties = [
  {
    id: "1",
    title: "Chung cư Vinhomes Green Bay",
    price: 3900000000,
    address: "Số 7 Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội",
    description: "Chung cư cao cấp với view đẹp",
    bedrooms: 3,
    bathrooms: 2,
    area: "85m2",
    propertyType: "Chung cư",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tenantId: "mock-tenant-id",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Biệt thự sân vườn sát sân bay Nội Bài",
    price: 8500000000,
    address: "Phường Phú Minh, Sóc Sơn, Hà Nội",
    description: "Biệt thự sang trọng với sân vườn rộng",
    bedrooms: 4,
    bathrooms: 3,
    area: "Trên 300m2",
    propertyType: "Biệt thự",
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tenantId: "mock-tenant-id",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Đất vườn sinh thái Thủ Thừa",
    price: 1200000000,
    address: "Ấp 11, Xã Thủ Thừa, Tỉnh Tây Ninh",
    description: "Đất vườn trồng cây ăn trái",
    bedrooms: 0,
    bathrooms: 0,
    area: "500m2",
    propertyType: "Đất vườn",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tenantId: "mock-tenant-id",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Thổ cư mặt tiền đường lớn",
    price: 2500000000,
    address: "Thị trấn Thủ Thừa, Tỉnh Long An",
    description: "Đất thổ cư vị trí đẹp",
    bedrooms: 0,
    bathrooms: 0,
    area: "200m2",
    propertyType: "Thổ cư",
    imageUrl:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tenantId: "mock-tenant-id",
    createdAt: new Date().toISOString(),
  },
];
