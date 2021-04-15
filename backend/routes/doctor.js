const { route } = require("./accountant");

const router = require("express").Router();


router.get("/freeslots/:id");
router.get("/appoints");
router.post("/markComplete");
router.post("/cancelAppoint");
router.post("/addpresc/:id");
router.post("/modifypresc/:id");


module.exports = router;
