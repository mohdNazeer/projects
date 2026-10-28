const app = require("./src/app")
const connectDB = require("./src/db/connectDB")
require("dotenv").config()
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
connectDB()