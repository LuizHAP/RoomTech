//Declarando Variaveis
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

//Criando o Model
var RelatorioSaidasSchema = new Schema({
    atuador: {type: String, required: true, trim: true},
    status: {type: String, required: true, trim: true}, 
    manual: {type: String, required: true},
    data: {type: Date, required: true}
});

//Exportando o Model
module.exports = mongoose.model('SHSaidas', RelatorioSaidasSchema);