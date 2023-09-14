const { Router } = require("express");
const { auth, authAdmin } = require("../middleware/auth");
const controller = require("../controller/messageController");

const router = Router();

router.get("/message", auth, controller.getMessage);
router.get("/message/:id", auth, controller.getMessageByID);
router.post("/message", auth, controller.addMessage);
router.delete("/message/:id", auth, controller.deleteMessage);
router.patch("/message", auth, controller.updateMessage);

module.exports = router;
