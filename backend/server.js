const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const logger = require("morgan");
const categoryRoute = require("./routes/categories");
const productRoute = require("./routes/products");
const invoiceRoute = require("./routes/invoices");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");

dotenv.config(); 
const app = express();
const port = process.env.PORT || 5000;


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB")
    }catch (error){
        console.log(error);
    }
}
app.use(logger("dev"))
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute)
app.use("/api/products", productRoute)
app.use("/api/invoices", invoiceRoute)
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)

app.get("/", (req,res) => res.send("Hello world"))

app.listen(port, () => {
    connect();
    console.log(`${port}`)
})