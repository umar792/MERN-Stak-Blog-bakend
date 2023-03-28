const express = require("express");
const app = express();

// --------------- cors
const cors = require("cors");
app.use(cors());

// ------------- cookieParser
var cookieParser = require('cookie-parser')
app.use(cookieParser())

// body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// --------- dotenv
require("dotenv").config()

// ---------------- mongoose connect 
require("./DB/conn")


// -------------- router 
app.use("/", require("./Router/userRouter"))
app.use("/", require("./Router/BlogRouter"))




app.listen(process.env.PORT, () => {
    console.log(`servervis running on port ${process.env.PORT}`);
})