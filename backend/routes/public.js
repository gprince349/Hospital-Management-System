const router = require("express").Router();
const pub = require("../controllers/public")
const auth = require("../utils/auth")


router.get("/curUserDetails", auth.requireAuth, pub.get_curUserDetails);
router.get("/stats", pub.get_stats);
router.get("/staffs", pub.get_staffs);
router.get("/doctors", pub.get_doctors);
router.get("/logout", pub.get_logout);


module.exports = router;
