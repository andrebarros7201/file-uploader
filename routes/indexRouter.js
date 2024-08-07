const router = require("express").Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.getIndex);

router.get("/sign-up", indexController.getSignUp);
router.post("/sign-up", indexController.postSignUp);

router.get("/log-in", indexController.getLogIn);
router.post("/log-in", indexController.postLogIn);

router.get("/log-out", indexController.getLogOut);

module.exports = router;
