const express = require("express");
const upload = require("../middlewares/uploadMiddleware");
const {
    getProducts,
    getProduct,
    create,
    update,
    remove
} = require("../controllers/productController");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getProduct);


router.post("/", verifyToken, upload.single("image"), create);


router.put("/:id", verifyToken, upload.single("image"), update);


router.delete("/:id", verifyToken, remove);

module.exports = router;