const { sendWelcomeEmail } = require("../services/emailService");
const { registerSchema } = require("../utils/validation");
const {
    registerUser,
    loginUser,
    getProfile
} = require("../services/authService");

const register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

       const user = await registerUser(req.body);

await sendWelcomeEmail(
    user.email,
    user.username
);

res.status(201).json({
    message: "User registered successfully",
    user
});

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const result = await loginUser(email, password);

        res.status(200).json({
            message: "Login successful",
            ...result
        });
        

    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};
const profile = async (req, res) => {
    try {
        const user = await getProfile(req.user.userId);

        res.status(200).json({
            message: "Profile fetched successfully",
            user
        });

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};


module.exports = {
    register,
    login,
    profile
};