const express = require("express");
const route = express.Router();
const multer = require("multer");
const path = require("path");

const services = require("../services/render");
const controller = require("../controller/controller");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
console.log(req,file)
    cb(null, __dirname, "../uploads");
  },
  filename: function (req, file, callback) {
  console.log("in function")

    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// console.log("storage", storage);
var upload = multer({
  
  storage: storage,
  // fileFilter: multerFilter,
}).single('image')

/**
 * @description Root route
 * @method GET /
 */

route.get("/", services.homeRoutes);

/**
 * @description add users
 * @method GET /add-user
 */
route.get("/add-user", services.add_user);

/**
 * @description update user
 * @method GET /update-user
 */

route.get("/update-user", services.update_user);

// API
route.post("/api/users",upload, controller.create
// (req, res) => {console.log("req.files,req.file",req.files,req.file)}
);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

module.exports = route;
