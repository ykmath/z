const express = require("express");
const router = express.Router();

const PostService = require("../controllers/PostsService");

router.post("/", (req, res) => {
    PostService.create(req, res);
});

router.get("/", (req, res) => {
    PostService.getAll(req, res);
});

router.get("/:id", (req, res) => {
    PostService.getOne(req, res);
});

router.patch("/:id", (req, res) => {
    PostService.likePost(req, res);
})

module.exports = router;