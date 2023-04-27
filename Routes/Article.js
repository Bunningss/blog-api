const router = require("express").Router();
const controller = require("../Controller/index");
const { verifyToken, verifyTokenAndAuthorization } = require("../verifyToken");

router.get("/", controller.article.getAll);
router.get("/article/:id", controller.article.getOne);
router.get(
  "/user-articles",
  verifyTokenAndAuthorization,
  controller.article.getUserArticles
);
router.post("/create", verifyToken, controller.article.create);
router.delete(
  "/delete/:articleId",
  verifyTokenAndAuthorization,
  controller.article.delete
);
router.put(
  "/update/:id",
  verifyTokenAndAuthorization,
  controller.article.update
);

module.exports = router;
