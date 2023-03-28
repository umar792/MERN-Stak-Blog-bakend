const userModel = require("../Model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


module.exports = {
    createUser: async (req, res) => {
        try {
            const { name, email, password, avatar } = req.body;
            if (!name || !email || !password || !avatar) {
                return res.status(400).json({
                    success: false,
                    message: "fill all fields"
                })
            }
            const user = await userModel.findOne({ email });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exist please login"
                })
            }
            await userModel.create(req.body);
            res.status(200).json({
                success: true,
                message: "Registration successfuly"
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },



    // ----------------- login 

    loginuser: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "plaese enter eamil or password"
                })
            }
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "plaese enter valid data"
                })
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid login details"
                })
            }

            const Token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d"
            })

            res.status(200).cookie("token", Token, {
                httpOnly: true
            }).json({
                success: true,
                message: "Login successfuly",
                Token
            })


        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },


    // -------------- alluser 

    alluser: async (req, res) => {
        try {
            const users = await userModel.find();
            res.status(200).json({
                success: true,
                users
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },


    // -------------------- get login user data
    loginuserData: async (req, res) => {
        try {
            const user = await userModel.findById(req.user._id);
            res.status(200).json({
                user
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    // ----------------- get single user 

    singleuser: async (req, res) => {
        try {
            const singleuser = await userModel.findById(req.params.id);
            if (!singleuser) {
                return res.status(400).json({
                    success: false,
                    message: "user not found"
                })
            }
            res.status(200).json({
                singleuser
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    // -------------------- delete user 

    Deleteuser: async (req, res) => {
        try {

            const user = await userModel.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "user not found"
                })
            }
            res.status(200).json({
                success: true,
                message: `user delete successfuly`
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },


    // ------------- updtae role 

    UpdateRole: async (req, res) => {
        try {
            const { role } = req.body;
            if (!role) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter user role"
                })
            }
            const user = await userModel.findById(req.params.id);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "user not found"
                })
            }

            user.role = role;
            await user.save();
            res.status(200).json({
                success: true,
                message: "Role update successfuly"
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }



}