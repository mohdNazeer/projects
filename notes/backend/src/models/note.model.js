const mongoose = require("mongoose")
const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
},{timestamps:true})
const note = mongoose.model("note",noteSchema)
module.exports = note