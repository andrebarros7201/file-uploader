const router = require("express").Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.getIndex);

router.get("/sign-up", indexController.getSignUp);
router.post("/sign-up", indexController.postSignUp);

module.exports = router;
