const express = require("express");

const products = require("../data/products");
const apiKeyMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "All products fetched successfully",
    data: products,
  });
});


router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      status: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: true,
    message: "Product fetched successfully",
    data: product,
  });
});


router.post("/", apiKeyMiddleware, (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      status: false,
      message: "Name, price and category are required",
    });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
  };

  products.push(newProduct);

  res.status(201).json({
    status: true,
    message: "Product added successfully",
    data: newProduct,
  });
});


router.put("/:id", apiKeyMiddleware, (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      status: false,
      message: "Product not found",
    });
  }

  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      status: false,
      message: "Name, price and category are required",
    });
  }

  product.name = name;
  product.price = price;
  product.category = category;

  res.status(200).json({
    status: true,
    message: "Product updated successfully",
    data: product,
  });
});


router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const productIndex = products.findIndex(
    (product) => product.id === id
  );

  if (productIndex === -1) {
    return res.status(404).json({
      status: false,
      message: "Product not found",
    });
  }

  const deletedProduct = products.splice(productIndex, 1);

  res.status(200).json({
    status: true,
    message: "Product deleted successfully",
    data: deletedProduct[0],
  });
});

module.exports = router;