const express = require("express");
const router = express.Router();

const userService = require("../controllers/UsersService");

router.post("/:nome", (req, res) => {
    userService.create(req, res);
})

router.get("/:nome", (req, res) => {
    userService.get(req, res);
})

module.exports = router;