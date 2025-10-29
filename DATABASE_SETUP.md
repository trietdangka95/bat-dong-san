# Database Setup Guide

## 🗄️ Database Configuration

### 1. Create `.env.local` file in project root:

```env
# Database - Replace with your actual database URL
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Database Options:

#### Option A: Neon (Recommended for development)

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string
4. Replace in `.env.local`:

```env
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

#### Option B: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database
3. Use local connection string:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/batdongsan"
```

### 3. Initialize Database:

```bash
# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed
```

### 4. Verify Setup:

```bash
# Open Prisma Studio to view data
npm run db:studio
```

## 🚀 Quick Start Commands:

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npm run db:generate

# 3. Setup database (after creating .env.local)
npm run db:push

# 4. Seed sample data
npm run db:seed

# 5. Start development server
npm run dev
```

## 🔧 Troubleshooting:

### "Module not found: Can't resolve '@prisma/client'"

```bash
npm run db:generate
```

### "Database connection failed"

- Check your DATABASE_URL in `.env.local`
- Ensure database is accessible
- Verify credentials

### "Schema not found"

```bash
npm run db:push
```

## 📊 Sample Data:

After seeding, you'll have:

- 2 tenants: "Tiến Dũng BĐS" and "Vietnam Real Estate"
- Sample properties for each tenant
- Admin users for each tenant

## 🌐 Local Domains:

Add to `/etc/hosts`:

```
127.0.0.1 tiendung.localhost
127.0.0.1 vietnamre.localhost
```

Then visit:

- http://tiendung.localhost:3000/tenant-demo
- http://vietnamre.localhost:3000/tenant-demo
