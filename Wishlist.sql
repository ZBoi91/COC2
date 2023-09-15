-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."Wishlist" (
    "WishlistID" int4 NOT NULL,
    "UserID" int4 NOT NULL,
    "CardsID" int4 NOT NULL,
    CONSTRAINT "fk_wishlist_user_id" FOREIGN KEY ("UserID") REFERENCES "public"."Users"("UserID"),
    CONSTRAINT "fk_wishlist_cards_id" FOREIGN KEY ("CardsID") REFERENCES "public"."Cards"("CardsID"),
    PRIMARY KEY ("WishlistID")
);

