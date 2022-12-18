const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv")

const categoryRoute = require("./routes/categories");
const productRoute = require("./routes/products");

dotenv.config(); 
const app = express();
const port = 5000;


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    }catch (error){
        console.log(error);
    }
}

app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute)
app.use("/api/products", productRoute)

app.get("/", (req,res) => res.send("Hello world"))

app.listen(port, () => {
    connect();
    console.log(`${port}`)
})