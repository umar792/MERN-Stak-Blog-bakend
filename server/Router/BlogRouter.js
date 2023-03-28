const express = require("express");
const router = express.Router();
const controller = require("../Controller/BlogController");
const TokenVerify = require("../Middleware/TokenVerify");
const AdminVerify = require("../Middleware/AdminVerify")

router.post("/createblog", TokenVerify, controller.createBlog);

router.get("/getUserBlog", TokenVerify, controller.getUserBlog);

router.delete("/userDeleteBlog/:id", TokenVerify, controller.userDeleteBlog);

router.get("/getSingleblog/:id", controller.SingleBlog);

router.get("/allblogs", controller.Allblogs);

router.delete("/AdminDeleteBlog/:id", TokenVerify, AdminVerify, controller.AdminDeleteBlog);

router.put("/updateBlog/:id", TokenVerify, controller.updateBlog);



module.exports = router;