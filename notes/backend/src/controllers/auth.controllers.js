const session = require("../models/session.model")
const crypto = require("crypto")
const user = require("../models/user.model")
const jwt = require("jsonwebtoken")
async function register(req, res) {
    const { username, email, password } = req.body
    const userExist = await user.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (userExist)
        return res.status(409).json({ message: "user already exist" })
    const User = await user.create({
        username: username,
        email: email,
        password: password
    })
    const refreshToken = jwt.sign(
        { id: User._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
    const Session = await session.create({
        userId: User._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["useragent"]
    })
    const accessToken = jwt.sign({
        id: User._id,
        sessionId: Session._id
    }, process.env.JWT_SECRET, {
        expiresIn: "10m"
    })
    res.cookie("refreshToken", refreshToken,
        {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    )
    res.status(201).json({
        message: "user has been registered",
        username: User.username,
        email: User.email,
        accessToken
    })
}
async function login(req, res) {
    const { identifier, password } = req.body
    const User = await user.findOne({
        $or:[
            {email:identifier},
            {username:identifier}
        ]
    })
    if (!(User && User.matchPassword(password))) {
        return res.status(401).json({ message: "user does not exist" })
    }
    const refreshToken = jwt.sign({
        id: User._id
    }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
    const Session = await session.create({
        userId: User.id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["useragent"]
    })
    const accessToken = jwt.sign({
        id: User._id,
        sessionId: Session._id
    }, process.env.JWT_SECRET, {
        expiresIn: "10m"
    })
    res.cookie("refreshToken", refreshToken,
        {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    )
    res.status(200).json({
        message: "user login successfully",
        username: User.username,
        email: User.email,
        accessToken
    })
}
async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return res.status(401).json({ message: "you don't have refresh token" })
    }
    try {
        jwt.verify(refreshToken, process.env.JWT_SECRET)
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
        const Session = await session.findOne({
            refreshTokenHash,
            revoked: false
        })
        if (!Session) {
            return res.status(401).json({ message: "session does not exist" })
        }
        Session.revoked = true
        await Session.save()
        res.clearCookie("refreshToken",{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ message: "user logout successfully" })
    }
    catch{
        return res.status(401).json({message:"refresh token is not valid"})
    }
}
async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        res.status(401).json({ message: "you don't have refresh token" })
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
        const Session = await session.findOne({
            refreshTokenHash,
            revoked: false
        })
        if (!Session) {
            return res.status(401).json({ message: "you are not eligible to generate access token" })
        }
        const accessToken = jwt.sign({
            id: decoded.id
        }, process.env.JWT_SECRET, {
            expiresIn: "10m"
        })
        res.status(200).json({
            message: "your access token has been created",
            accessToken
        })
    }
    catch{
        res.status(401).json({message:"refresh token is not valid"})
    }
}
async function isLoggedIn(req,res){
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken)
        return res.status(401).json({message:"you are logout"})
    return res.status(200).json({message:"you are login"})
}
module.exports = { register, login, logout, refreshToken,isLoggedIn }