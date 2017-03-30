//Declarando Variaveis
var mongoose = require('mongoose');
var SHTemp   = require('../models/temperatura');
var SHUmid   = require('../models/umidade');
var SaidasAux = require ('../models/saidasaux');

var express = require('express');
var router = express.Router();

//Importando Modelos
var User = require('../models/user');

//Rotas do sistema (acesso as telas)
router.get('/', function(req, res){
	res.render('home');
});

router.get('/home', function(req, res){
	res.render('home');
});

router.get('/areas', function(req, res) {
		res.render('areas');
});

router.get('/alarme', function(req, res) {
    res.render('alarme');
});

router.get('/register', function(req, res){
	res.render('register');
});

router.get('/logout', function(req, res){
	res.redirect('/home');
});

//Rota POST que recebe o formulário de login
router.post('/login', function(req, res) {
    
    username = req.body.username;
    User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		res.redirect('/');
   	}
    res.redirect('/home');
    });
});

//Rota POST que recebe o formulário de Registro
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
    
    var newUser = new User({
        name: name,
        email: email,
        username: username,
        password: password
    });

    User.createUser(newUser, function(err, user){
        if(err) throw err;
        console.log(user);
    });

    res.redirect('/');
});

//Função "Saidas"
router.get('/saidas', function (req, res){
        SaidasAux.find({})
            .exec(function (err, result){
            if (err){
                console.log(err);
            } else {
                res.json(result);
            }
        });
    });

//Função "Temperatura"
router.get('/Temperatura', function (req, res){
    SHTemp.find({}).sort({_id: -1}).limit(1)
        .exec(function (err, temps) {
            if (err || !temps) {
            } else {
                res.send(temps[0].temp);
            }
    })
});

//Função "Umidade"
router.get('/Umidade', function (req, res){
    SHUmid.find({}).sort({_id: -1}).limit(1)
        .exec(function (err, umidades) {
            if (err || !umidades) {
            } else {
                res.send(umidades[0].umidade);
            }
    })
});

//Exportando Rotas
module.exports = router;