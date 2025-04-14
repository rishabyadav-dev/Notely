const express = require("express");
const app = express();
const protect = require("../middleware/authMiddleware");
const usermodel = require("../models/user");
const router = express.Router();

router.get("/validate-token", protect, async (req, res) => {
  const userdata = await usermodel.findById(req.user.userid);

  console.log("email which we search from MDB using id- " + userdata.email);

  res.json({
    valid: true,
    user: req.user.userid,
    useremail: userdata.email,
  });
});
module.exports = router;
