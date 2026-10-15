const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "e-commerce-products"
        });

        fs.unlinkSync(filePath);

        return result.secure_url;

    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        throw new Error("Image upload failed");
    }
};

module.exports = {
    uploadToCloudinary
};