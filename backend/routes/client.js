const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

router.use("/", (req, res) => {
    let url = req.path;
    const files = "../frontend/dist";
    if (url === "/") url = "/index.html";

    const newPath = path.join(files, url);
    const isValid = fs.existsSync(newPath);

    console.log("conectado!", req.path, isValid)

    if (!isValid) return;
    res.sendFile(path.basename(newPath), {root: path.dirname(newPath)});
})

module.exports = router;