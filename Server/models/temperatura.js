//Declarando Variaveis
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

//Criando o Model
var RelatoriosTempSchema = new Schema({
    temp: { type: String, required: true, trim: true},
    data: {type: Date, required: true}
});

//Exportando o Model
module.exports = mongoose.model('SHTemp', RelatoriosTempSchema);