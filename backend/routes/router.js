const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const postRoute = require("./post");
const commentRoute = require("./comment");
const userRoute = require("./user");
const client = require("./client");

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/user", userRoute);
app.use("/", client);

app.listen(3050, "0.0.0.0", () => {
    console.log("Servidor Online!");
})
