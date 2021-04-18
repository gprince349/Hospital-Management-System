const router = require("express").Router();
const adm = require("../controllers/admin");
// admin

router.post("/login", adm.post_login);
router.post("/logout", adm.post_logout);


module.exports = router;
