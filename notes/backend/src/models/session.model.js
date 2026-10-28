const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    refreshTokenHash:{
        type:String,
        require:true
    },
    ip:{
        type:String,
        require:true
    },
    userAgent:{
        type:String,
        require:true
    },
    revoked:{
        type:Boolean,
        default:false
    } 
},{
    timestamps:true
})
const session = mongoose.model("session",sessionSchema)
module.exports = session