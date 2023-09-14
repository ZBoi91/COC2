const { Router } = require("express");
const { auth, authAdmin } = require("../middleware/auth");
const controller = require("../controller/chatController");

const router = Router();

router.get("/chat",auth, controller.getChat);
router.get("/chat/:id", auth, controller.getChatByID);
router.post("/chat", auth, controller.addChat);
router.delete("/chat/:id", auth, controller.deleteChat);

module.exports = router;
