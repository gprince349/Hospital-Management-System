const router = require("express").Router();
const pharm = require("../controllers/pharmacy");

router.get("/all", pharm.get_all);
router.post("/add", pharm.post_add);
router.post("/update", pharm.post_update);
router.post("/search", pharm.post_search);
router.post("/checkout", pharm.post_checkout);


module.exports = router;
