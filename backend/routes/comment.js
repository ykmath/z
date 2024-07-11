const express = require("express");
const router = express.Router();

const commentService = require("../controllers/CommentsService");

router.post("/:id", (req, res) => {
    commentService.create(req, res);
})

module.exports = router;