const Invoice = require("../models/Invoice");
const express = require("express");
const router = express.Router();



router.get("/get-all", async (req,res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    }
    catch(error){
        res.status(500).json(error);

    }
})


router.put("/update", async (req,res) => {
    try {
        await Invoice.findOneAndUpdate({ _id: req.body.invoiceId }, req.body)
        res.status(200).json("Invoice updated successfully");
    }
    catch(error){
        res.status(500).json(error);

    }
})


router.delete("/delete", async (req,res) => {
    try {
        await Invoice.findOneAndDelete({ _id: req.body.invoiceId })
        res.status(200).json("Invoice deleted successfully");
    }
    catch(error){
        res.status(500).json(error);

    }
})


router.post("/add", async (req,res) => {
    try {
        const newInvoice = new Invoice(req.body);
        await newInvoice.save();
        res.status(200).json("Invoice added successfully")
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;