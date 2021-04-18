const router = require("express").Router();
const acc = require("../controllers/accountant");
// "/accountant"

router.post("/addMoney", acc.post_addMoney);
router.post("/withdrawMoney", acc.post_withdrawMoney);


module.exports = router;
