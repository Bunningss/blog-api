const controller = require("../Controller/index");
const router = require("express").Router();

router.post("/login", controller.auth.login);
router.post("/register", controller.auth.register);

module.exports = router;
