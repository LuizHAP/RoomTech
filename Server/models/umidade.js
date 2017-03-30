//Declarando Variaveis
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

//Criando o Model
var RelatoriosUmidSchema = new Schema({
    umidade: { type: String, required: true, trim: true},
    data: {type: Date, required: true}
});

//Exportando o Model
module.exports = mongoose.model('SHUmid', RelatoriosUmidSchema);