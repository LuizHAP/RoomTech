//Declarando Variaveis
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//Criando o Model
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

//Exportando o Model
var User = module.exports = mongoose.model('User', UserSchema);

//Funcao CreateUser -> Criando Usuario
module.exports.createUser = function(newUser, callback){
    /*
    
    Antes de criar o login, recebe o campo "password" e cria um valor criptografado
    para armazenar no BD
    
    */
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

//Funcao GetUserByUsername -> Procurando Usuario
module.exports.getUserByUsername = function(username, callback){
    //Recebe o conteúdo do campo "username" e verificar se existe algum usuario e retorna.
	var query = {username: username};
	User.findOne(query, callback);
}

//Funcao GetUserByID -> Procurando Usuario pelo ID
module.exports.getUserById = function(id, callback){
    //Recebe o conteúdo do campo "username" e verificar se existe algum usuario e retorna.
	User.findById(id, callback);
}

//Funcao ComparePassword-> Compara a senha do BD com a senha informada
module.exports.comparePassword = function(candidatePassword, hash, callback){
    //Recebe o conteúdo do campo "password" e compara
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

