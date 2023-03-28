const jwt = require("jsonwebtoken");
const userModel = require("../Model/UserSchema")

const TokenVerify = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(400).json({
                success: false,
                messsage: "Token expire please login"
            })
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id);
        next()

    } catch (error) {
        res.status(400).json({
            success: false,
            messsage: error.messsage
        })
    }
}

module.exports = TokenVerify