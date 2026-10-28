const express = require("express")
const {register,login,logout,refreshToken} = require("../controllers/auth.controllers")
const router = express.Router()
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.post("/refreshToken",refreshToken)
module.exports = router