-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."ListingType" AS ENUM ('RENT', 'SALE');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Accommodation" (
    "id" TEXT NOT NULL,
    "img" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "listing_type" "public"."ListingType" NOT NULL,
    "title" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "features" JSONB NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "disscount" DOUBLE PRECISION NOT NULL,
    "build_year" BIGINT NOT NULL,
    "description" TEXT NOT NULL,
    "documents" JSONB NOT NULL,
    "map_url" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "extra_features" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "icon_img" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "accommodation_id" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rating" (
    "id" BIGSERIAL NOT NULL,
    "clean" DOUBLE PRECISION NOT NULL,
    "location" DOUBLE PRECISION NOT NULL,
    "communicate" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,
    "accommodation_id" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Likes" (
    "id" BIGSERIAL NOT NULL,
    "like" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,
    "accommodation_id" TEXT NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Accommodation" ADD CONSTRAINT "Accommodation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Accommodation" ADD CONSTRAINT "Accommodation_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Likes" ADD CONSTRAINT "Likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Likes" ADD CONSTRAINT "Likes_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
