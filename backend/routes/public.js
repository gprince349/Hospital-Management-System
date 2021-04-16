const router = require("express").Router();
const pub = require("../controllers/public")

router.get("/stats", pub.get_stats);
router.get("/staffs", pub.get_staffs);
router.get("/doctors", pub.get_doctors);


module.exports = router;
