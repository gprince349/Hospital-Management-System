const router = require("express").Router();


router.get("/history");
router.post("/login");
router.post("/logout");
router.post("/bookAppoint");
router.post("/addMoney");
router.post("/withdrawMoney");


module.exports = router;
