const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    nome: String,
    img: {type: String, default: "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"}
})

const userSchema = mongoose.model("User", user);


module.exports = userSchema;