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

//get all data

router.get("/", async (req, res, next) => {
  try {
    const product = await Product.find({});

    if (!product) {
      return res
        .status(400)
        .json({ success: false, msg: "Something error happened" });
    }

    res.status(200).json({
      success: true,
      count: product.length,
      products: product,
      msg: "Successfully fetched",
    });
  } catch (error) {
    next(error);
  }
});

//Update data

router.put("/:id", async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, msg: "product  not exits" });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res
      .status(200)
      .json({ success: true, product: product, msg: "Successfully updated" });
  } catch (error) {
    next(error);
  }
});

//delete data

router.delete("/:id", async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ success: false, msg: "Product not exits" });
    }

    pro = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      msg: "Successfully Deleted product.",
    });
  } catch (error) {
    next(error);
  }
});
