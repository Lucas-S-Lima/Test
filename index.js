const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const Post = require('./models/Post')


// Configurações

    // Template engine
    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
    }))
    app.set('view engine', 'handlebars')

    // Body-parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())



// Rotas
    app.get('/', function(req, res){ 
        Post.findAll({order:[['id', 'DESC']]}).then(function(posts){
            res.render("layouts/home", {posts: posts})
        })
    })

    //  rota de cadastro do post
    app.get('/cadastro', function(req, res){
        res.render("forms")
    });

    // capturando e criando o registro no banco de dados
    app.post('/add', function(req, res){
        
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
        }).then(function(){
            res.redirect('/')
        }).catch(function(erro){
            res.send("Houve um erro no cadastro: " + erro)
        })
    
    });

    // rota de deleção de post
    app.get('/delete/:id', function(req, res){
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.send("Postagem excluída com sucesso.")
        }).catch(function(){
            res.send("Esta postagem não existe.")
        })
    })



app.listen(8081, function(){
    console.log("Servidor rodando na porta 8081.")
});