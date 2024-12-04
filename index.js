const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();

const indexRoutes = require("./routes/index");
const usersRoutes = require("./routes/users");

app.use(bodyParser.json());

app.use("/", indexRoutes);
app.use("/users", usersRoutes);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});