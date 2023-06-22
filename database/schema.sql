SET client_min_messages TO warning;

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
  "detail" text NOT NULL,
  "detail2" text NOT NULL,
  "detail3" text NOT NULL,
  "detail4" text NOT NULL,
  "detail5" text NOT NULL,
  "productId" serial NOT NULL,
  CONSTRAINT "myPets_pk" PRIMARY KEY ("productId")
)
WITH (
  OIDS = FALSE
);

CREATE TABLE "public"."subscription"(
  "firstName" text NOT NULL,
  "lastName" text NOT NULL,
  "email" text NOT NULL,
  "address" text NOT NULL,
  "username" text NOT NULL,
  "hashedPassword" text NOT NULL,
  "userId" serial NOT NULL,
  CONSTRAINT "Subscription_pk" PRIMARY KEY ("userId")
)
WITH (
  OIDS = FALSE
);

CREATE TABLE "public"."myCart"(
    "userId" integer NOT NULL,
  "productId" integer NOT NULL,
  CONSTRAINT "myCart_pk" PRIMARY KEY ("productId", "userId")
)
WITH (
  OIDS = FALSE
);

CREATE TABLE "public"."myWishList"(
    "userId" integer NOT NULL,
  "productId" integer NOT NULL,
  CONSTRAINT "myWishList_pk" PRIMARY KEY ("productId", "userId")
)
WITH (
  OIDS = FALSE
);
