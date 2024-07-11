const mongoose = require("mongoose");
const commentSchema = require("./Comments");
const Schema = mongoose.Schema;

const posts = new Schema({
    texto: String,
    usuario: String,
    liked: [String],
    data: {type: Date, default: Date.now},
    comentarios: [commentSchema]
})

const Post = mongoose.model("Post", posts);

module.exports = Post;