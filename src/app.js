import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://pranalgupta:pranal@cluster0.t7nfg19.mongodb.net/libraryDB",{useNewUrlParser:true})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


app.listen(port,function()
{
    console.log("Server started successfully")
})