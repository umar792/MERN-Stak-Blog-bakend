const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your username"]
    },
    email: {
        type: String,
        required: [true, "Plaese enter your email"],
        unique: [true, "Email already exist please login"],
        validate: [validator.isEmail, "Plaese Enter valid Email Adress"],
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    password: {
        type: String,
        required: [true, "Plaese enter your password"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})


const userModel = mongoose.model("user", UserSchema);
module.exports = userModel;