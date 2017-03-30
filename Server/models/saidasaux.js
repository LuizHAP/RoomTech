//Declarando Variaveis
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

//Criando o Model
var RelatorioSaidaAux = new Schema ({
    atuador: {type: String, required: true, trim: true},
    status: {type: String, required: true, trim: true},
});

//Exportando o Model
module.exports = mongoose.model('SHSaidasAUX', RelatorioSaidaAux);