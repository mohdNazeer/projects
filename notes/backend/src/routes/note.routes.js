const express = require("express")
const auth = require("../middleware/auth")
const router = express.Router()
const note = require("../models/note.model")
router.post("/createNote", auth, async (req, res) => {
    await note.create({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.userId
    })
    res.status(201).json({
        msg: "note created successfully"
    })
})
router.delete("/deleteNote/:id", auth, async (req, res) => {
    await note.findByIdAndDelete(req.params.id)
    res.status(200).json({
        msg: "note delete successfully"
    })
})
router.patch("/updateNote/:id", auth, async (req, res) => {
    await note.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({
        msg: "note updated successfully"
    })
})
router.get("/getNote/:id", auth, async (req, res) => {
    const foundNote = await note.findById(req.params.id)
    res.status(200).json({
        msg: "note fetch successfully",
        note: foundNote
    })
})
router.get("/getAllNotes", auth, async (req, res) => {
    const notes = await note.find({ createdBy: req.userId })
    res.status(201).json({
        msg: "notes fetch successfully",
        notes
    })
})
router.post("/getNotes", auth, async (req, res) => {
    // const escaped = searchText.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'])
    const {searchText} = req.body
    const notes = await note.find({
        createdBy:req.userId,
        $or:[
            {title:{$regex:searchText,$options:"i"}},
            {description:{$regex:searchText,$options:"i"}}
        ]
    })
    res.status(200).json({
        "message":"notes fetch successfully",
        notes

    })
})
module.exports = router

