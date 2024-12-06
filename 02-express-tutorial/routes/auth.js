const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { logOn, logOff, test} = require("../controllers/auth")

router.post("/login", logOn);
router.delete("/logoff", logOff);
router.get("/test", auth, test);

module.exports = router;
