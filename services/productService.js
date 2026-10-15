const Product = require("../models/Product");

const getAllProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};

const createProduct = async (productData) => {
    const product = await Product.create(productData);

    return product;
};

const updateProduct = async (id, productData) => {
    const product = await Product.findByIdAndUpdate(
        id,
        productData,
        {
            new: true,
            runValidators: true
        }
    );

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};

const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};