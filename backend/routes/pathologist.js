const router = require("express").Router();
const patho = require("../controllers/pathologist")

router.post("/update", patho.post_update);
router.post("/addreport", patho.post_addreport);
router.post("/cancelTestAppoint", patho.post_cancelTestAppoint);


module.exports = router;
