const { Router } = require("express");
const { recieveMessage, sendMessage } = require("../controllers/messages");

const { validateAuth, validateAdmin } = require("../middleware/auth");

const router = Router();

router.post("/chat/:receiverId", validateAuth, recieveMessage);

router.post("/:receiverId", validateAuth, validateAdmin, sendMessage);

module.exports = router;

