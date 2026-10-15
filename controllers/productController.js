const { productSchema } = require("../utils/validation");
const { uploadToCloudinary } = require("../services/cloudinaryService");
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../services/productService");

const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();

        res.status(200).json({
            message: "Products fetched successfully",
            products
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);

        res.status(200).json({
            message: "Product fetched successfully",
            product
        });

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const create = async (req, res) => {
    try {
        let imageUrl = "";

        if (req.file) {
            imageUrl = await uploadToCloudinary(
                req.file.path
            );
        }

        const productData = {
            ...req.body,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            image: imageUrl
        };

        const { error } = productSchema.validate(productData);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const product = await createProduct(productData);

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        let imageUrl = req.body.image || "";

        if (req.file) {
            imageUrl = await uploadToCloudinary(req.file.path);
        }
       console.log("BODY:", req.body);
console.log("PRICE:", req.body.price);
        const productData = {
            ...req.body,
            price: Number(req.body.price),
            stock: Number(req.body.stock)
        };

        if (req.file) {
            productData.image = imageUrl;
        }

        const product = await updateProduct(
            req.params.id,
            productData
        );

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const remove = async (req, res) => {
    try {
        await deleteProduct(req.params.id);

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

module.exports = {
    getProducts,
    getProduct,
    create,
    update,
    remove
};