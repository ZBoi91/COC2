const { Router } = require("express");
const controller = require("../controller/cardsController");

const { auth, authAdmin } = require("../middleware/auth");

const router = Router();

// Get all cards
router.get("/", controller.getCards);

// Get one card by ID
router.get("/:id", auth, controller.getCardsByID);

// Create a new card
router.post("/", auth, controller.addCards);

// Update card by ID
router.patch("/:id", auth, controller.updateCards);

// Delete card by ID
router.delete("/:id", auth, controller.deleteCards);

module.exports = router;
