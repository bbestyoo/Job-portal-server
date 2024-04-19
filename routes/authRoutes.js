const express = require("express");
const router = express.Router();
const Signup = require("../controller/Signup");
const Login = require("../controller/Login");
const multer = require("multer");
const upload = require("../multer/multer");


router.post("/api/signup",upload.single('image'),Signup);
router.post("/api/login",Login)

module.exports = router;