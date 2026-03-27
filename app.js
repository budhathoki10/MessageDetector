const express= require("express")
const app= express();
const apps = require("./Message");
require('dotenv').config()
app.use(express.json())

app.use("/api",apps)
app.listen(5000,()=>{
    console.log("server connected sucessfully")
})