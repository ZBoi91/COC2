const getCards = 'SELECT * FROM "Cards"';
const getCardsByID = 'SELECT * FROM "Cards" WHERE "CardsID" = $1';
const checkCardsIDExists = 'SELECT s FROM "Cards" WHERE "CardsID" = $1';
const addCards =
  'INSERT INTO "Cards" ("SellerID", "Games", "Name", "Price", "Description", "CardsID", "Image") VALUES ($1, $2, $3, $4, $5, $6, $7)';
const deleteCards = 'DELETE FROM "Cards" WHERE "CardsID" = $1';
const updateCards =
  'UPDATE "Cards" SET "SellerID" = $1, "Games" = $2, "Name" = $3, "Price" = $4, "Description" = $5, "Image" = $6 WHERE "CardsID" = $7';

module.exports = {
  getCards,
  getCardsByID,
  checkCardsIDExists,
  addCards,
  deleteCards,
  updateCards,
};
