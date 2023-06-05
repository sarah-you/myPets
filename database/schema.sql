set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."myPets" (
	"productName" TEXT NOT NULL,
	"petType" TEXT NOT NULL,
	"category" TEXT NOT NULL,
	"itemPrice" real NOT NULL,
	"subscriptionPrice" real NOT NULL,
	"brandName" TEXT NOT NULL,
	"reviews" integer NOT NULL,
	"ratings" real NOT NULL,
	"productId" serial NOT NULL,
	CONSTRAINT "myPets_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);
