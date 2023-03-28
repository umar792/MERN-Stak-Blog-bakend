const mongoose = require("mongoose");

mongoose.connect(process.env.BAS_URL).then(() => {
    console.log("mongoose is connect");
}).catch(() => {
    console.log("mongoose is not connect");
})