const mongoose = require("mongoose");

console.log("Conectando...")

mongoose.connect("mongodb+srv://matheusmesquitay:Umasenhaae1%23@cluster0.hjcsulg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
 .then(() => {
    console.log("Conexão Estabelecida!")
 })
 .catch((err) => console.log(err));

 module.exports = mongoose.connection;