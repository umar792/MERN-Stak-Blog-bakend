const express = require("express");
const router = express.Router();
const controller = require("../Controller/userController");
const TokenVerify = require("../Middleware/TokenVerify")
const AdminVerify = require("../Middleware/AdminVerify")

router.post("/registration", controller.createUser);

router.post("/login", controller.loginuser);

router.get("/singleuser/:id", controller.singleuser);

router.get("/loginuserData", TokenVerify, controller.loginuserData);

router.get("/alluser", TokenVerify, AdminVerify, controller.alluser)

router.delete("/Deleteuser/:id", TokenVerify, AdminVerify, controller.Deleteuser)

router.put("/UpdateRole/:id", TokenVerify, AdminVerify, controller.UpdateRole)





module.exports = router;