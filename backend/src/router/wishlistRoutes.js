const { Router } = require("express");
const controller = require("../controller/wishlistController");
const { auth, authAdmin } = require("../middleware/auth");

const router = Router();

router.get("/wishlist", auth, controller.getWishlist);
router.get("/wishlist/:id", auth, controller.getWishlistByID);
router.post("/wishlist", auth, controller.addWishlist);
router.delete("/wishlist/:id", auth, controller.deleteWishlist);
router.patch("/wishlist", auth, controller.updateWishlist);

module.exports = router;
