CREATE TABLE "public"."myPets" (
	"productName" TEXT NOT NULL,
	"petType" TEXT NOT NULL,
	"category" TEXT NOT NULL,
	"itemPrice" real NOT NULL,
	"subscriptionPrice" real,
	"brandName" TEXT NOT NULL,
	"reviews" integer NOT NULL,
	"ratings" real NOT NULL,
	"imgUrl" TEXT NOT NULL,
	"imgUrl2" TEXT,
	"imgUrl3" TEXT,
	"imgUrl4" TEXT,
	"detail" text NOT NULL,
  "detail2" text NOT NULL,
  "detail3" text NOT NULL,
  "detail4" text NOT NULL,
  "detail5" text NOT NULL,
	"productId" serial NOT NULL,
	CONSTRAINT "myPets_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."subscription" (
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"address" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);
