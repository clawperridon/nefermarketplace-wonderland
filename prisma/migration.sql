// NEFER Marketplace - SQL Migration Script
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USER & AUTHENTICATION
-- ============================================

CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'BRAND', 'ADMIN');

CREATE TABLE "User" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatarUrl" TEXT,
    role "UserRole" DEFAULT 'CUSTOMER',
    "isActive" BOOLEAN DEFAULT true,
    "emailVerified" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "CustomerProfile" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "preferredCategories" TEXT[],
    "preferredColors" TEXT[],
    "preferredPriceRange" JSONB,
    "sizeProfile" JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE "AddressType" AS ENUM ('SHIPPING', 'BILLING');

CREATE TABLE "Address" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "customerId" TEXT NOT NULL REFERENCES "CustomerProfile"(id) ON DELETE CASCADE,
    type "AddressType" DEFAULT 'SHIPPING',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    company TEXT,
    street TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT DEFAULT 'NL',
    phone TEXT,
    "isDefault" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- BRANDS
-- ============================================

CREATE TYPE "BrandStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED', 'ARCHIVED');
CREATE TYPE "PayoutSchedule" AS ENUM ('WEEKLY', 'BIWEEKLY', 'MONTHLY');
CREATE TYPE "BrandRole" AS ENUM ('OWNER', 'ADMIN', 'EDITOR', 'VIEWER');
CREATE TYPE "MemberStatus" AS ENUM ('INVITED', 'ACTIVE', 'DISABLED');

CREATE TABLE "Brand" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    story TEXT,
    "logoUrl" TEXT,
    "heroImageUrl" TEXT,
    "coverImageUrl" TEXT,
    website TEXT,
    email TEXT,
    instagram TEXT,
    tiktok TEXT,
    country TEXT,
    city TEXT,
    status "BrandStatus" DEFAULT 'PENDING',
    "isFeatured" BOOLEAN DEFAULT false,
    "commissionRate" FLOAT DEFAULT 0.15,
    "payoutSchedule" "PayoutSchedule" DEFAULT 'MONTHLY',
    "userId" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "BrandMember" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "brandId" TEXT NOT NULL REFERENCES "Brand"(id) ON DELETE CASCADE,
    role "BrandRole" DEFAULT 'EDITOR',
    status "MemberStatus" DEFAULT 'INVITED',
    "invitedAt" TIMESTAMP WITH TIME ZONE,
    "acceptedAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE("userId", "brandId")
);

-- ============================================
-- PRODUCTS
-- ============================================

CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'ARCHIVED');

CREATE TABLE "Category" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    "imageUrl" TEXT,
    "parentId" TEXT REFERENCES "Category"(id),
    position INT DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "Tag" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT DEFAULT 'GENERAL',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "Product" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "brandId" TEXT NOT NULL REFERENCES "Brand"(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    materials TEXT,
    price DECIMAL(10,2) NOT NULL,
    "compareAtPrice" DECIMAL(10,2),
    "categoryId" TEXT REFERENCES "Category"(id),
    status "ProductStatus" DEFAULT 'DRAFT',
    "isFeatured" BOOLEAN DEFAULT false,
    "isActive" BOOLEAN DEFAULT true,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    title TEXT,
    "imageUrl" TEXT,
    images TEXT[],
    category TEXT,
    sizes TEXT[],
    colors TEXT[],
    material TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE("brandId", slug)
);

CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");
CREATE INDEX "Product_status_idx" ON "Product"(status);
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

CREATE TABLE "ProductImage" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" TEXT NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    "altText" TEXT,
    position INT DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "ProductVariant" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" TEXT NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
    sku TEXT,
    size TEXT,
    color TEXT,
    weight DECIMAL(8,3),
    price DECIMAL(10,2),
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE("productId", size, color)
);

CREATE TABLE "Inventory" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "variantId" TEXT UNIQUE NOT NULL REFERENCES "ProductVariant"(id) ON DELETE CASCADE,
    quantity INT DEFAULT 0,
    "reservedQty" INT DEFAULT 0,
    "lowStockThreshold" INT DEFAULT 3,
    "lastRestocked" TIMESTAMP WITH TIME ZONE,
    "lastSold" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "ProductTag" (
    "productId" TEXT NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
    "tagId" TEXT NOT NULL REFERENCES "Tag"(id) ON DELETE CASCADE,
    PRIMARY KEY ("productId", "tagId")
);

CREATE TABLE "ProductAnalytics" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" TEXT NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
    "eventType" TEXT NOT NULL,
    count INT DEFAULT 1,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX "ProductAnalytics_productId_idx" ON "ProductAnalytics"("productId");
CREATE INDEX "ProductAnalytics_date_idx" ON "ProductAnalytics"(date);

-- ============================================
-- ORDERS
-- ============================================

CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED');
CREATE TYPE "FulfillmentStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'RETURNED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');

CREATE TABLE "Order" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "orderNumber" TEXT UNIQUE NOT NULL,
    "customerId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    status "OrderStatus" DEFAULT 'PENDING',
    subtotal DECIMAL(10,2) NOT NULL,
    "shippingCost" DECIMAL(10,2) DEFAULT 0,
    "taxAmount" DECIMAL(10,2) DEFAULT 0,
    "discountAmount" DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    "shippingAddress" JSONB,
    "shippingMethod" TEXT,
    "customerNote" TEXT,
    "internalNote" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");
CREATE INDEX "Order_status_idx" ON "Order"(status);

CREATE TABLE "OrderItem" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "orderId" TEXT NOT NULL REFERENCES "Order"(id) ON DELETE CASCADE,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productImage" TEXT,
    "variantId" TEXT,
    "variantInfo" JSONB,
    "brandId" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    quantity INT NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "fulfillmentStatus" "FulfillmentStatus" DEFAULT 'PENDING',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");
CREATE INDEX "OrderItem_brandId_idx" ON "OrderItem"("brandId");

CREATE TABLE "Fulfillment" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "orderId" TEXT NOT NULL REFERENCES "Order"(id) ON DELETE CASCADE,
    "brandId" TEXT NOT NULL REFERENCES "Brand"(id),
    status "FulfillmentStatus" DEFAULT 'PENDING',
    carrier TEXT,
    "trackingNumber" TEXT,
    "trackingUrl" TEXT,
    "shippedAt" TIMESTAMP WITH TIME ZONE,
    "deliveredAt" TIMESTAMP WITH TIME ZONE,
    "shippingAddress" JSONB NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE("orderId", "brandId")
);

CREATE INDEX "Fulfillment_orderId_idx" ON "Fulfillment"("orderId");
CREATE INDEX "Fulfillment_brandId_idx" ON "Fulfillment"("brandId");

CREATE TABLE "Payment" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "orderId" TEXT UNIQUE NOT NULL REFERENCES "Order"(id) ON DELETE CASCADE,
    "stripePaymentIntentId" TEXT UNIQUE,
    "stripeChargeId" TEXT,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status "PaymentStatus" DEFAULT 'PENDING',
    "refundedAmount" DECIMAL(10,2) DEFAULT 0,
    "refundReason" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- COLLECTIONS
-- ============================================

CREATE TYPE "CollectionStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "CollectionType" AS ENUM ('MANUAL', 'AUTOMATED', 'TRENDING', 'NEW_ARRIVALS');

CREATE TABLE "Collection" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    "coverImageUrl" TEXT,
    "featuredImageUrl" TEXT,
    status "CollectionStatus" DEFAULT 'DRAFT',
    "isFeatured" BOOLEAN DEFAULT false,
    type "CollectionType" DEFAULT 'MANUAL',
    rules JSONB,
    position INT DEFAULT 0,
    "publishedAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "CollectionProduct" (
    "collectionId" TEXT NOT NULL REFERENCES "Collection"(id) ON DELETE CASCADE,
    "productId" TEXT NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
    position INT DEFAULT 0,
    PRIMARY KEY ("collectionId", "productId")
);

CREATE TABLE "BrandCollection" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "brandId" TEXT NOT NULL REFERENCES "Brand"(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SAVED ITEMS
-- ============================================

CREATE TABLE "SavedProduct" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "productId" TEXT NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
    notes TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE("userId", "productId")
);

CREATE TABLE "SavedBrand" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "brandId" TEXT NOT NULL REFERENCES "Brand"(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE("userId", "brandId")
);

-- ============================================
-- EVENTS
-- ============================================

CREATE TABLE "CustomerEvent" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT REFERENCES "User"(id) ON DELETE SET NULL,
    "eventType" TEXT NOT NULL,
    "productId" TEXT,
    "brandId" TEXT,
    "categoryId" TEXT,
    "collectionId" TEXT,
    metadata JSONB,
    "sessionId" TEXT,
    referrer TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX "CustomerEvent_userId_idx" ON "CustomerEvent"("userId");
CREATE INDEX "CustomerEvent_eventType_idx" ON "CustomerEvent"("eventType");
CREATE INDEX "CustomerEvent_createdAt_idx" ON "CustomerEvent"("createdAt");

-- ============================================
-- CMS
-- ============================================

CREATE TABLE "ContentBlock" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    type TEXT NOT NULL,
    content JSONB NOT NULL,
    position INT DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(page, section, position)
);

CREATE TABLE "Banner" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    "imageUrl" TEXT NOT NULL,
    "linkUrl" TEXT,
    "linkText" TEXT,
    position INT DEFAULT 1,
    "backgroundColor" TEXT DEFAULT '#1A2B3C',
    "textColor" TEXT DEFAULT '#FFFFFF',
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- LOYALTY
-- ============================================

CREATE TABLE "UserPoints" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT UNIQUE NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    points INT DEFAULT 0,
    "totalPointsEarned" INT DEFAULT 0,
    "totalPointsSpent" INT DEFAULT 0,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ADDITIONAL MODELS
-- ============================================

CREATE TABLE "Drop" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "brandId" TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    "imageUrl" TEXT,
    "launchDate" TIMESTAMP WITH TIME ZONE NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "StoryOfWeek" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    "brandId" TEXT,
    "brandName" TEXT,
    "imageUrl" TEXT,
    description TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "weekStart" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "Review" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "User"(id),
    rating INT NOT NULL,
    title TEXT,
    comment TEXT,
    "isApproved" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "DiscountCode" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "discountType" TEXT NOT NULL,
    "discountValue" FLOAT NOT NULL,
    "minOrderAmount" FLOAT DEFAULT 0,
    "usageLimit" INT,
    "usedCount" INT DEFAULT 0,
    "expiresAt" TIMESTAMP WITH TIME ZONE,
    description TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "WishlistAlert" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    size TEXT,
    color TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "notifiedAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "Message" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT,
    "recipientBrandId" TEXT,
    "productId" TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    "isRead" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "NewsletterSubscriber" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE "AdminSettings" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "pointsPerEuro" INT DEFAULT 1,
    "pointsRedemptionRate" FLOAT DEFAULT 1.0,
    "minPointsToRedeem" INT DEFAULT 100,
    "welcomePoints" INT DEFAULT 0,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- RLS POLICIES (Basic)
-- ============================================

-- Enable RLS
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Brand" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Collection" ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public brands are viewable by everyone" ON "Brand" FOR SELECT USING (status = 'APPROVED');
CREATE POLICY "Public products are viewable by everyone" ON "Product" FOR SELECT USING (status = 'APPROVED' AND "isActive" = true);
CREATE POLICY "Public collections are viewable by everyone" ON "Collection" FOR SELECT USING (status = 'PUBLISHED');

-- Users can read their own data
CREATE POLICY "Users can read own profile" ON "User" FOR SELECT USING (auth.uid()::text = id);

-- Brands can manage their own products
CREATE POLICY "Brands can manage own products" ON "Product" FOR ALL USING (
    EXISTS (SELECT 1 FROM "Brand" WHERE "Brand".id = "Product"."brandId" AND "Brand"."userId" = auth.uid()::text)
);

-- ============================================
-- SEED DATA
-- ============================================

-- Categories
INSERT INTO "Category" (name, slug, position) VALUES
('Tops', 'tops', 1),
('Bottoms', 'bottoms', 2),
('Dresses', 'dresses', 3),
('Outerwear', 'outerwear', 4),
('Accessories', 'accessories', 5),
('Shoes', 'shoes', 6),
('Bags', 'bags', 7)
ON CONFLICT (slug) DO NOTHING;

-- Sample Brands
INSERT INTO "Brand" (name, slug, description, status, "isFeatured") VALUES
('ATLAS', 'atlas', 'Minimalist contemporary fashion', 'APPROVED', true),
('VOID', 'void', 'Streetwear essentials', 'APPROVED', true),
('NINE', 'nine', 'Sustainable luxury', 'APPROVED', true),
('SONE', 'sone', 'Timeless elegance', 'APPROVED', true)
ON CONFLICT (slug) DO NOTHING;

-- Sample Collection
INSERT INTO "Collection" (name, slug, description, status, "isFeatured", type) VALUES
('New Arrivals', 'new-arrivals', 'The latest additions to NEFER', 'PUBLISHED', true, 'NEW_ARRIVALS')
ON CONFLICT (slug) DO NOTHING;

-- Admin Settings
INSERT INTO "AdminSettings" (id, "pointsPerEuro", "pointsRedemptionRate", "minPointsToRedeem", "welcomePoints") VALUES
('default', 1, 1.0, 100, 50)
ON CONFLICT (id) DO NOTHING;

-- Banner
INSERT INTO "Banner" (id, title, subtitle, "imageUrl", "backgroundColor", "textColor", position) VALUES
('homepage-hero', 'New Season', 'Discover emerging designers', '/images/banner-hero.jpg', '#0A0A0A', '#FAF8F5', 1)
ON CONFLICT (id) DO NOTHING;

-- Story of Week
INSERT INTO "StoryOfWeek" (title, "brandName", description, "isActive") VALUES
('The Rise of Independent Design', 'NEFER Studios', 'This week we spotlight the emerging designers who are redefining fashion from their studios.', true)
ON CONFLICT DO NOTHING;

-- Story of Week
INSERT INTO "StoryOfWeek" (title, "brandName", description, "isActive") VALUES
('The Rise of Independent Design', 'NEFER Studios', 'This week we spotlight the emerging designers who are redefining fashion from their studios.', true)
ON CONFLICT DO NOTHING;

SELECT '✅ Migration complete!';
