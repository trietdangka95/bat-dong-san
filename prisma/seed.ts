import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create sample tenants
  const tenant1 = await prisma.tenant.upsert({
    where: { domain: "tiendung.localhost" },
    update: {},
    create: {
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
    },
  });

  const tenant2 = await prisma.tenant.upsert({
    where: { domain: "vietnamre.localhost" },
    update: {},
    create: {
      name: "Vietnam Real Estate",
      domain: "vietnamre.localhost",
      logoUrl: "/vietnam_logo.png",
      theme: "dark",
      primaryColor: "#10B981",
      secondaryColor: "#059669",
      config: {
        description: "Bất động sản hàng đầu Việt Nam",
        contact: {
          phone: "0123 456 789",
          email: "info@vietnamre.com",
          address: "Hà Nội, Việt Nam",
        },
      },
    },
  });

  console.log("✅ Created tenants:", {
    tenant1: tenant1.name,
    tenant2: tenant2.name,
  });

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: {
      email_tenantId: {
        email: "admin@tiendung.localhost",
        tenantId: tenant1.id,
      },
    },
    update: {},
    create: {
      name: "Admin Tiến Dũng",
      email: "admin@tiendung.localhost",
      password: "hashedpassword123", // In real app, hash this
      role: "admin",
      tenantId: tenant1.id,
    },
  });

  const user2 = await prisma.user.upsert({
    where: {
      email_tenantId: {
        email: "admin@vietnamre.localhost",
        tenantId: tenant2.id,
      },
    },
    update: {},
    create: {
      name: "Admin Vietnam RE",
      email: "admin@vietnamre.localhost",
      password: "hashedpassword123", // In real app, hash this
      role: "admin",
      tenantId: tenant2.id,
    },
  });

  console.log("✅ Created users");

  // Create sample properties for tenant1 (Tiến Dũng BĐS)
  const properties1 = [
    {
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
      tenantId: tenant1.id,
    },
    {
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
      tenantId: tenant1.id,
    },
    {
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
      tenantId: tenant1.id,
    },
    {
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
      tenantId: tenant1.id,
    },
  ];

  // Create sample properties for tenant2 (Vietnam RE)
  const properties2 = [
    {
      title: "Luxury Apartment District 1",
      price: 5000000000,
      address: "District 1, Ho Chi Minh City",
      description: "Luxury apartment in the heart of the city",
      bedrooms: 2,
      bathrooms: 2,
      area: "75m2",
      propertyType: "Căn hộ",
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tenantId: tenant2.id,
    },
    {
      title: "Modern Villa Phu My Hung",
      price: 12000000000,
      address: "Phu My Hung, District 7, Ho Chi Minh City",
      description: "Modern villa with swimming pool",
      bedrooms: 5,
      bathrooms: 4,
      area: "400m2",
      propertyType: "Biệt thự",
      imageUrl:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tenantId: tenant2.id,
    },
  ];

  // Insert properties
  for (const property of [...properties1, ...properties2]) {
    await prisma.property.upsert({
      where: {
        id: `${property.tenantId}-${property.title}`, // Simple unique constraint
      },
      update: {},
      create: property,
    });
  }

  console.log("✅ Created properties");

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
