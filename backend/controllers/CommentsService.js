const db = require("../models/connection");
const Post = require("../models/Posts");
const Comment = require("../models/Comments");

const CommentService = {
    create: async (req, res) => {
        const postID = req.params.id;
        const text = req.body.msg;
        const user = req.body.usuario;

        if (!text || !user || !postID) return;

        try {
            const post = await Post.findByIdAndUpdate(postID, {$push: {
                comentarios: {
                    texto: text,
                    usuario: user,
                    post: postID
                }
            }}, {new: true})

            if (post) {
                res.status(201).json({msg: "Comentário criado com sucesso!", value: post});
                return;
            }

            res.status(500).json({msg: "Houve um erro na criação do comentário."})
        } catch (err) {
            console.log(err);
            res.status(500).json({msg: "Erro ao criar comentário"})
        }
    }
}

module.exports = CommentService;