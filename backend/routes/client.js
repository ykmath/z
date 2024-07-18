const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

router.use("/*", (req, res) => {
   res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
})

module.exports = router;