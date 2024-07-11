const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    nome: String,
    img: {type: String, default: ""}
})

const userSchema = mongoose.model("User", user);


module.exports = userSchema;