const Product = require("../models/Product");
const express = require("express");
const router = express.Router();



router.get("/get-all", async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json(error);

    }
})


router.put("/update", async (req,res) => {
    try {
        await Product.findOneAndUpdate({ _id: req.body.productId }, req.body)
        res.status(200).json("Product updated successfully");
    }
    catch(error){
        res.status(500).json(error);

    }
})


router.delete("/delete", async (req,res) => {
    try {
        await Product.findOneAndDelete({ _id: req.body.productId })
        res.status(200).json("Product deleted successfully");
    }
    catch(error){
        res.status(500).json(error);

    }
})


router.post("/add", async (req,res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json("Product added successfully")
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;