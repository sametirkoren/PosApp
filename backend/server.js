const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")


dotenv.config(); 

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    }catch (error){
        console.log(error);
    }
}

const app = express();
const port = 5000;

app.get("/", (req,res) => res.send("Hello world"))

app.listen(port, () => {
    connect();
    console.log(`${port}`)
})