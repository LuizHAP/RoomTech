/////////////////////////////////////////////////////////////////////////////
///                                                                       ///
///                           SMART HOUSE                                 ///
///                     Criado por Luiz Pansarini                         ///
///                                                                       ///
///                                                                       ///
/////////////////////////////////////////////////////////////////////////////

// Declaração de Variáveis do Sistema
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan               = require('morgan');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var app = express();
var http                 = require('http');
var server               = http.createServer(app);
var io                   = require('socket.io').listen(server);

//Importando Modelos
var SHSaidas             = require('./models/saidas'), //Collection para Saidas
    SHTemp               = require('./models/temperatura'), //Collection para Temperaturas
    SHUmid              = require('./models/umidade'), //Collection para Temperaturas
    SHSaidasAux          = require('./models/saidasaux'); // Collection para Ultimas Saidas

//Variáveis Auxiliares
var recebido = "";
var status = "";
var temperatura = "";
var umidade = "";
var statusArdu = "";
var manual = "";

//Importando BD
var db = mongoose.connection; //Declarando Variavel
mongoose.connect('mongodb://localhost/SmartHouse'); //Conectando ao Banco de Dados

//Declarando Rotas e Usuarios
var routes = require('./routes/index');

// View Engine
app.set('view engine', 'ejs');

//Set up Express Aplication
app.use(morgan('dev'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Setando Arquivos Estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//(Função TempAtual)
app.post('/TempAtual', function (req, res){
    /*Recebe o conteúdo do corpo do comando POST
    
    Ex: POST /TempAtual?graus=90
    Nesse caso, a variável "temperatura" irá receber o valor "90"
    */
    temperatura = req.query.graus;
    res.send('Temperatura enviada');
    
    //Prepara o Banco de Dados para inserir a Temperatura recebida
    var model = new SHTemp();
    var date = new Date();
    
    model.temp = temperatura;
    model.data = date;
    
    //Grava informação no Banco de Dados
    model.save(function(err){
        if (err){
            console.log(err);
        }
        console.log ('Gravado no BD: ' + temperatura + ' ºC');
    })
});

//(Função UmidAtual)
app.post('/UmidAtual', function (req, res){
    /*Recebe o conteúdo do corpo do comando POST
    
    Ex: POST /UmidAtual?umidade=90
    Nesse caso, a variável "umidade" irá receber o valor "90"
    */
    umidade = req.query.umidade;
    res.send('Umidade enviada');
    
    //Prepara o Banco de Dados para inserir a Temperatura recebida
    var model = new SHUmid();
    var date = new Date();
    
    model.umidade = umidade;
    model.data = date;
    
    //Grava informação no Banco de Dados
    model.save(function(err){
        if (err){
            console.log(err);
        }
        console.log ('Gravado no BD: ' + umidade + ' ºC');
    })
});

//(Função AcionaManual)
app.post('/AcionaManual', function (req, res){
    /*Recebe os valores "Atuador" e "Estado" via comando POST
    
    Ex: POST /AcionaManual?atuador=SALALAMP&estado=ON
    
    Nesse caso, a variável "saida" irá receber o valor "SALALAMP" e a variável
    "estado" irá receber o valor "ON". Ambos juntos, podemos dizer que a Lâmpada
    da Sala foi ligada manualmente.
    
    */
    var saida = req.query.atuador;
    var estado = req.query.estado;
    manual = "true"; //Informa que foi uma ação Manual
    
    //Prepara o BD para inserir o Atuador e o Status
    var NovoAUXManu = new SHSaidasAux();
    
        NovoAUXManu.atuador = saida;
        NovoAUXManu.status = estado;
    
    //Procura se já existe algum registro desse atuador, deleta e insere um novo Status
    SHSaidasAux.findOneAndRemove({atuador: saida}, function(err){
            if (err){
                console.log(err);
            }
        })
    
    //Grava informação no BD
    NovoAUXManu.save(function(err){
            if (err){
                console.log(err);
            }
        })

    //Envia para o Cliente HTML, via Socket i.o, o Atuador e o Estado, para acionamento manual
    res.send("Estado enviado!");
    if (saida === "QTD1LAMP"){
        io.sockets.emit("QTD1LAMP", estado);
        } else if (saida === "QTD2LAMP"){
            io.sockets.emit("QTD2LAMP", estado);
        } else if (saida === "SALALAMP"){
            io.sockets.emit("SALALAMP", estado);
        } else if (saida === "COZILAMP"){
            io.sockets.emit("COZILAMP", estado);
        } else if (saida === "ENTRLAMP"){
            io.sockets.emit("ENTRLAMP", estado);
        } else if (saida === "PERICASA"){
            io.sockets.emit("PERICASA", estado);
    }
});

//Função EnviaStatus)
io.on("connection", function(socket) {
    var atuadorA;
    socket.on('atuador', function(atuador) {
        atuadorA = atuador; //Armazena na variável "AtuadorA" qual foi o botão selecionado no sistema.
    })
    socket.on('status', function(status){
        
        var statusA = status;
        var model = new SHSaidas();
        var date = new Date();
        
        var NovoAUX = new SHSaidasAux();
    
        //Prepara o BD
        NovoAUX.atuador = atuadorA;
        NovoAUX.status = statusA;
        
        //Verifica se foi acionado MANUAL ou SISTEMA;
        if (manual === "true"){
            model.manual = "SIM"
            console.log('Saida ' + atuadorA + ' alterada para ' + statusA + ' devido a ação Manual');
        } else {
            model.manual = "NÃO"
            console.log('Saida ' + atuadorA + ' alterada para ' + statusA + ' devido a ação do Sistema');
        }
        
        manual = "";

        //Procura se já existe algum registro desse atuador, deleta e insere um novo Status
        SHSaidasAux.findOneAndRemove({atuador: atuadorA}, function(err){
            if (err){
            } else {
            }
        })
        
        //Grava informação no BD
        NovoAUX.save(function(err){
            if (err){
                console.log(err);
            }
        })
        
        //Prepara o BD
        model.atuador = atuadorA;
        model.status = statusA;
        model.data = date;
        
        //Grava informação no BD
        model.save(function(err){
            if (err){
                console.log(err);
            }
            console.log('Saida Adicionada no Relatório: ' + atuadorA + ', ' + statusA);
        })
        //Junta as variáveis para enviar para o Arduino
        statusArdu = atuadorA + ', ' + statusA;
    })
});

//(Função StatusSaidas)
app.get('/StatusSaidas', function(req,res){
    /*
        Envia o conteúdo da variável "statusArdu", que é o último botão acionado no site,
        para o Arduino
    */
    res.charset = 'UTF-8';
    console.log('Send to Arduino: ' + statusArdu);
    res.send(statusArdu);
    statusArdu = "";
});

const PORT=5000; 

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://127.0.0.1:%s", PORT);
});