const router = require("express").Router();
const patient = require("../controllers/patient")

router.get("/history", patient.get_history);
router.post("/login", patient.post_login);
router.post("/bookAppoint", patient.post_bookAppoint);
router.post("/addMoney", patient.post_addMoeny);
router.post("/withdrawMoney", patient.post_withdrawMoney);


module.exports = router;
