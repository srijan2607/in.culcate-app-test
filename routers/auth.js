const express = require("express");
const router = express.Router();

const {loginUser}= require("../controllers/auth/auth");
const {logout} = require("../controllers/auth/logout");

router.post("/", loginUser);
router.post("/logout", logout);

module.exports = router;