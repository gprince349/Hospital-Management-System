const router = require("express").Router();


router.post("/login");
router.post("/logout");

router.get("/prescription/:id");
router.get("/report/:id");
router.get("/appoints");
router.get("/testappoints");
router.get("/patientinfo/:id");
router.get("/patientAppoints/:id");
router.get("/patientTestAppoints/:id");


module.exports = router;
