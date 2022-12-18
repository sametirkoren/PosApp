const Category = require("../models/Category");
const express = require("express");
const router = express.Router();



router.get("/get-all", async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    }
    catch(error){
        res.status(500).json(error);
    }
})


router.put("/update", async (req,res) => {
    try {
        await Category.findOneAndUpdate({ _id: req.body.categoryId }, req.body)
        res.status(200).json("Category updated successfully");
    }
    catch(error){
        res.status(500).json(error);
    }
})


router.delete("/delete", async (req,res) => {
    try {
        await Category.findOneAndDelete({ _id: req.body.categoryId })
        res.status(200).json("Category deleted successfully");
    }
    catch(error){
        res.status(500).json(error);
    }
})


router.post("/add", async (req,res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(200).json("Category added successfully")
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;