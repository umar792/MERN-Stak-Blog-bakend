const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter blog title"]
    },
    discription: {
        type: String,
        required: [true, "Please enter blog discription"]
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    categorry: {
        type: String,
        required: [true, "Please enter blog category"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


});

const BlogModel = mongoose.model("blog", BlogSchema);
module.exports = BlogModel;