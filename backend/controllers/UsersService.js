require("../models/connection");

const userSchema = require("../models/Users");

const userService = {
    create: async (req, res) => {
        const nome = req.params.nome;
        const created = await userSchema.find({nome: nome});
        console.log(created)

        if (created.length > 0) {
            res.status(200).json({msg: "Ja existe."});
            console.log("Usuário existente.")
            return;
        };

        console.log("Criando usuário: " + nome)

        const user = new userSchema({
            nome: nome,
        })
        user.save()
         .then((r) => {
            res.status(200).json({msg: "Usuário criado com sucesso!", value: r})
         })
         .catch((err) => console.log(err))
    },
    get: async (req, res) => {
        const nome = req.params.nome;
        const exist = await userSchema.findOne({nome: nome});

        if (!exist || exist.length === 0) {
            res.status(404).json({msg: "Este usuário nao existe.", value: []});
            return;
        }

        res.status(200).json({msg: "Usuário encontrado!", value: exist});
    },
    changePicture: async (req, res) => {
        const nome = req.params.nome;
        const newPhoto = req.body.value;

        const user = await userSchema.findOneAndUpdate({nome: nome}, {$set: {img: newPhoto}});
        
        if (!user || user.length === 0) {
            res.status(404).json({msg: "Usuário não encontrado."})
            return;
        };

        res.status(201).json({msg: "Foto alterada com sucesso!", value: newPhoto});
    }
}

module.exports = userService;