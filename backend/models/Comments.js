const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comments = new Schema({
    texto: String,
    usuario: String,
    liked: [String],
    data: {type: Date, default: Date.now},
    post: {type: Schema.Types.ObjectId, ref: "Post"}
})

module.exports = comments;