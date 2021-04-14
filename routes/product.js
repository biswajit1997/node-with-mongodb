const express = require("express");
const { model } = require("mongoose");

const Product = require("../models/Product");
const router = express.Router();

// create method POST
router.post("/", async (req, res, next) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
    });
    if (!product) {
      return res.status(400).json({
        success: false,
        msg: "Something went wrong",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
      msg: "Successfully created.",
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
