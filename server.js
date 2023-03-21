const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
// const bodyparser = require("body-parser");
const path = require("path");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;
// console.log(process.env.PORT && 0 ? "koko" : "lok");

// log request
app.use(morgan("tiny"));

// mongodb connection
require("./server/database/connection");

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// set view engine
app.set("view engine", "ejs");
app.use(express.static("uploads"));
// app.set('views', path.resolve(__dirname, "views/ejs"))

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load Routers
app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
