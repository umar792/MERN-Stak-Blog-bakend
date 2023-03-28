const userModel = require("../Model/UserSchema");

const AdminVerify = async (req, res, next) => {
    try {
        if (req.user.role === "user") {
            return res.status(400).json({
                success: false,
                messsage: `sory ${req.user.role} cannot access this path`

            })
        }
        next()

    } catch (error) {
        res.status(400).json({
            success: false,
            messsage: error.messsage
        })
    }
}

module.exports = AdminVerify