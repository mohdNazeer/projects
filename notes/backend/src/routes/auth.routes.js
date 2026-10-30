const express = require("express")
const {register,login,logout,refreshToken,isLoggedIn} = require("../controllers/auth.controllers")
const router = express.Router()
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.post("/refreshToken",refreshToken)
router.post("/isLoggedIn",isLoggedIn)
module.exports = router