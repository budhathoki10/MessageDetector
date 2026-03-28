const express= require("express")
const app= express();
const apps = require("./Message");
const rateLimit = require('express-rate-limit');
require('dotenv').config()
app.use(express.json())
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5, 
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);
app.use("/api",apps)
app.listen(5000,()=>{
    console.log("server connected sucessfully")
})