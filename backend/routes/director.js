const router = require("express").Router();
const dir = require("../controllers/director");

router.post("/addstaff", dir.post_addstaff);
router.post("/removestaff", dir.post_removestaff);


module.exports = router;
