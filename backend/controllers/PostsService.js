const db = require("../models/connection");
const Post = require("../models/Posts");

const PostService = {
    create: (req, res) => {
        const {nome, msg} = req.body;

        if (nome && msg) {
            const obj = new Post({
                texto: msg,
                usuario: nome,
                comentarios: []
            })
            obj.save()
             .then(() => {
                console.log("Post criado com sucesso!");
                res.status(201).json({msg: "Post criado com sucesso!"});
             })
             .catch((err) => {
                console.log("Erro: " + err);
                res.status(500).json({msg: "Erro ao criar post!"});
             });
        }
    },
    getAll: async (req, res) => {
        try {
            const resp = await Post.find({}).sort({data: -1});

            if (!resp || resp.length === 0) {
                res.status(404).json({msg: "Nenhum post encontrado."});
                return;
            }

            res.status(200).json(resp);
        } catch (err) {
            console.log("Erro ao consultar posts: ", err);
            res.status(500).json({msg: "Erro ao pegar posts!"});
        }
    },
    getOne: async (req, res) => {
        const id = req.params.id;

        try {
            const resp = await Post.findById(id);

            if (!resp || resp.length === 0) {
                res.status(404).json({msg: "Erro, post nao encontrado."});
                return;
            }

            res.status(200).json(resp);
        } catch (err) {
            console.log("Erro ao procurar post: ", err);
            res.status(500).json({msg: "Erro ao procurar post."})
        }
    },
    likePost: async (req, res) => {
        const id = req.params.id;
        const user = req.body.usuario;
        const value = req.body.value;

        try {
            let post;

            if (value) {
                post = await Post.findByIdAndUpdate(id, {$push: {liked: user}}, {new: true})
            } else {
                post = await Post.findByIdAndUpdate(id, {$pull: {liked: user}}, {new: true})
            }

            if (post) {
                res.status(201).json({msg: "Status de Like alterado com sucesso!", value: post.liked.length})
            } else {
                res.status(404).json({msg: "Post não encontrado."})
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({msg: "Erro alterar status de like."})
        }
    }
}

module.exports = PostService;