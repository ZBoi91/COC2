const getWishlist = 'SELECT * FROM "Wishlist"';
const getWishlistByID = 'SELECT * FROM "Wishlist" WHERE "WishlistID" = $1';
const addWishlist =
  'INSERT INTO "Wishlist" ("WishlistID", "UserID", "CardsID") VALUES ($1, $2, $3)';
const deleteWishlist = 'DELETE FROM "Wishlist" WHERE "WishlistID" = $1';
const updateWishlist =
  'UPDATE "Wishlist" SET "UserID" = $2, "CardsID" = $3 WHERE "WishlistID" = $1';

module.exports = {
  getWishlist,
  getWishlistByID,
  addWishlist,
  deleteWishlist,
  updateWishlist,
};
