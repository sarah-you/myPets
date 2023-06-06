SET client_min_messages TO warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
DROP SCHEMA "public" CASCADE;

CREATE SCHEMA "public";

CREATE TABLE "public"."myPets"(
  "productName" text NOT NULL,
  "petType" text NOT NULL,
  "category" text NOT NULL,
  "itemPrice" real NOT NULL,
  "subscriptionPrice" real,
  "brandName" text NOT NULL,
  "reviews" integer NOT NULL,
  "ratings" real NOT NULL,
  "imgUrl" text NOT NULL,
  "imgUrl2" text,
  "imgUrl3" text,
  "imgUrl4" text,
  "details" text NOT NULL,
  "productId" serial NOT NULL,
  CONSTRAINT "myPets_pk" PRIMARY KEY ("productId")
)
WITH (
  OIDS = FALSE
);
