const router = require("express").Router();
const controller = require("../Controller/index");
const { verifyToken, verifyTokenAndAuthorization } = require("../verifyToken");

router.get("/", controller.article.getAll);
router.get("/:id", controller.article.getOne);
router.post("/create", verifyToken, controller.article.create);
router.post(
  "/update/:id",
  verifyTokenAndAuthorization,
  controller.article.update
);

module.exports = router;
