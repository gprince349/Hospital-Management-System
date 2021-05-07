const router = require("express").Router();
const patient = require("../controllers/patient")
const auth = require("../utils/auth");

router.get("/history",  auth.requireAuth, patient.get_history);
router.post("/login",   patient.post_login);
router.post("/register", patient.post_register);
router.post("/update",  auth.requireAuth, patient.post_update_details);
router.post("/bookAppoint", auth.requireAuth, patient.post_bookAppoint);
router.post("/addMoney",    auth.requireAuth, patient.post_addMoney);
router.post("/withdrawMoney", auth.requireAuth, patient.post_withdrawMoney);


module.exports = router;
