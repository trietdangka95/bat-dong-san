# Multi-Tenant SaaS Real Estate Platform

## 🏗️ Architecture Overview

This is a multi-tenant SaaS platform built with Next.js (App Router) + Prisma + NeonDB that allows multiple real estate companies to have their own branded websites with isolated data.

### Key Features:

- **Single Database, Multiple Tenants**: All tenants share one PostgreSQL database with data isolation via `tenantId`
- **Domain-based Tenant Resolution**: Each tenant has their own domain (e.g., `company1.com`, `company2.com`)
- **Custom Branding**: Each tenant can have custom logos, colors, and themes
- **Data Isolation**: All queries automatically filter by `tenantId` to ensure data separation

## 🗄️ Database Schema

### Core Models:

- **Tenant**: Stores tenant metadata (name, domain, logo, theme, colors)
- **User**: Tenant-scoped users with email uniqueness per tenant
- **Property**: Real estate listings scoped to specific tenants

### Data Isolation:

Every model includes a `tenantId` field that references the `Tenant` table. All database queries must include `where: { tenantId }` to ensure proper data isolation.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Create a Neon PostgreSQL database
2. Set up your `.env` file:

```env
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
```

### 3. Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Development

```bash
npm run dev
```

## 🌐 Domain Configuration

### Local Development

Add these entries to your `/etc/hosts` file:

```
127.0.0.1 tiendung.localhost
127.0.0.1 vietnamre.localhost
```

### Production

Point your domains to your server:

- `company1.com` → Your server
- `company2.com` → Your server

## 🎨 Tenant Customization

### Adding a New Tenant

1. Insert a new record in the `Tenant` table:

```sql
INSERT INTO tenants (name, domain, logoUrl, theme, primaryColor, secondaryColor)
VALUES ('New Company', 'newcompany.com', '/logo.png', 'light', '#FF6B6B', '#EE5A52');
```

2. The middleware will automatically detect the domain and apply the tenant's branding.

### Tenant Configuration

Each tenant can customize:

- **Name**: Company name
- **Domain**: Custom domain
- **Logo**: Logo URL
- **Theme**: 'light' or 'dark'
- **Colors**: Primary and secondary colors
- **Config**: Additional JSON configuration

## 🔧 API Endpoints

### Tenant API

- `GET /api/tenant` - Get current tenant data

### Properties API

- `GET /api/properties` - List properties (tenant-scoped)
- `POST /api/properties` - Create property (tenant-scoped)

### Query Parameters for Properties:

- `page` - Page number
- `limit` - Items per page
- `search` - Search in title/address
- `propertyType` - Filter by property type
- `priceMin`/`priceMax` - Price range
- `areaMin`/`areaMax` - Area range

## 🎯 Demo Pages

### Tenant Demo

Visit `/tenant-demo` to see the multi-tenant system in action:

- `http://tiendung.localhost:3000/tenant-demo`
- `http://vietnamre.localhost:3000/tenant-demo`

Each domain will show different branding, colors, and data.

## 🔐 Security Considerations

### Data Isolation

- All database queries automatically include `tenantId` filter
- Middleware validates tenant existence before processing requests
- API routes check for valid tenant context

### Authentication (Future Enhancement)

- Implement JWT tokens with tenant context
- Add role-based access control (admin/user)
- Secure password hashing with bcrypt

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── tenant/route.ts      # Tenant API
│   │   └── properties/route.ts  # Properties API
│   └── tenant-demo/page.tsx     # Demo page
├── components/
│   ├── ThemedLayout/            # Tenant-themed layout
│   ├── ThemedButton/            # Tenant-themed buttons
│   └── PropertyGridAPI/         # API-powered property grid
├── contexts/
│   └── TenantContext.tsx        # Tenant React context
├── lib/
│   └── tenant.ts                # Tenant utilities
└── middleware.ts                # Domain-based tenant resolution

prisma/
├── schema.prisma                # Database schema
└── seed.ts                      # Sample data
```

## 🚀 Deployment

### Environment Variables

```env
DATABASE_URL="your-neon-database-url"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"
```

### Database Migration

```bash
npm run db:migrate
```

### Production Build

```bash
npm run build
npm start
```

## 🔄 Adding New Tenants

To add a new tenant:

1. **Database**: Insert tenant record
2. **DNS**: Point domain to your server
3. **Done**: The system automatically handles the rest!

## 🎨 Customization Examples

### Theme Colors

```typescript
// Light theme
primaryColor: "#3B82F6"; // Blue
secondaryColor: "#1E40AF"; // Darker blue

// Dark theme
primaryColor: "#10B981"; // Green
secondaryColor: "#059669"; // Darker green
```

### Custom Configuration

```json
{
  "description": "Company description",
  "contact": {
    "phone": "+84 123 456 789",
    "email": "info@company.com",
    "address": "Company address"
  },
  "features": ["feature1", "feature2"]
}
```

## 🐛 Troubleshooting

### Common Issues:

1. **Tenant not found**: Check domain configuration and database
2. **Data not loading**: Verify tenantId is being passed correctly
3. **Styling issues**: Check tenant theme configuration
4. **Database errors**: Ensure Prisma client is generated

### Debug Commands:

```bash
# Check database connection
npm run db:studio

# View logs
npm run dev

# Reset database
npm run db:push --force-reset
npm run db:seed
```

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Admin dashboard for tenant management
- [ ] Advanced property search and filtering
- [ ] Image upload and management
- [ ] Email notifications
- [ ] Analytics and reporting
- [ ] Multi-language support
- [ ] Mobile app API
