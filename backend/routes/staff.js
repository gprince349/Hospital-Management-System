const router = require("express").Router();
const staff = require("../controllers/staff")
const auth = require("../utils/auth")

router.post("/login", staff.post_login);
router.post("/update", auth.requireAuth, staff.post_update_details);

router.get("/prescription/:id", auth.requireAuth, staff.get_prescription);
router.get("/report/:id", auth.requireAuth, staff.get_report);
router.get("/appoints", auth.requireAuth, staff.get_appoints);
router.get("/testappoints", auth.requireAuth, staff.get_testAppoints);
router.get("/patientinfo/:id", auth.requireAuth, staff.get_patientinfo);
router.get("/patientAppoints/:id", auth.requireAuth, staff.get_patientAppoints);
router.get("/patientTestAppoints/:id", auth.requireAuth, staff.get_patientTestAppoints);


module.exports = router;
