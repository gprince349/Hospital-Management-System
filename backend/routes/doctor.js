const router = require("express").Router();
const doc = require("../controllers/doctor");

router.get("/freeslots/:id", doc.get_freeslot);
router.get("/appoints", doc.get_appoints);
router.post("/markComplete", doc.post_markComplete);
router.post("/cancelAppoint", doc.post_cancelAppoint);
router.post("/addpresc/:id", doc.post_addpresc);
router.post("/modifypresc/:id", doc.post_modifypresc);


module.exports = router;
