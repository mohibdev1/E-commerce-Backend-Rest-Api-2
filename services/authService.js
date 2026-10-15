const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (userData) => {
    const { username, email, password, phone } = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        phone
    });

    return {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone
    };
};


const loginUser = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }
    
    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );


    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone
        }
    };
      
};
const getProfile = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};

