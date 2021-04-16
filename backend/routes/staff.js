const router = require("express").Router();
const staff = require("../controllers/staff")

router.post("/login", staff.post_login);
router.post("/logout", staff.post_logout);

router.get("/prescription/:id", staff.get_prescription);
router.get("/report/:id", staff.get_report);
router.get("/appoints", staff.get_appoints);
router.get("/testappoints", staff.get_testAppoints);
router.get("/patientinfo/:id", staff.get_patientinfo);
router.get("/patientAppoints/:id", staff.get_patientAppoints);
router.get("/patientTestAppoints/:id", staff.get_patientTestAppoints);


module.exports = router;
