const express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); 

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require("./routes/auth");
const ui = require("./routes/ui");
const api = require("./routes/api");

app.use(express.static("public"));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");

app.use(auth);
app.use(ui);
app.use(api);

app.listen(3000, console.info("App started."));
const axios = require("axios");
