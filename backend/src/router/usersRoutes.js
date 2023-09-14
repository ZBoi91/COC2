const { Router } = require("express");
const controller = require("../controller/usersController");
const { auth, authAdmin } = require("../middleware/auth");

const router = Router();

router.get("/users", auth, controller.getUsers);
router.get("/users/:id", auth, controller.getUsersByID);
router.post("/users", auth, controller.addUsers);
router.delete("/users/:id", auth, controller.deleteUsers);
router.patch("/users", auth, controller.updateUsers);

module.exports = router;
