//Função para receber o estado de cada Atuador
var app = angular.module('Areas',[]);
    app.controller('AppCtrl', function($scope, $http, $interval) {
        
        $interval(function(){
            var request = $http.get('/saidas');    
                request.success(function(response) {
                    $scope.saidas = response;
                    var StatusAcionar;
                    var AtuadorAcionar;
                    /*Para cada valor de "saída" que receber, irá verificar quais é o valor das 2
                    variáveis e alterar o estado do botões conforme o dado.
                    */
                    for(var i = 0; i < $scope.saidas.length; i++){
                        var saidasaux = $scope.saidas[i];
                        AtuadorAcionar = saidasaux.atuador;
                        StatusAcionar = saidasaux.status;
                        switch(AtuadorAcionar) {
                            case "QTD1LAMP":
                                $('#QTD1LAMP').bootstrapToggle('destroy')
                                if (StatusAcionar === "ON"){
                                    $('#QTD1LAMP').prop('checked', true);
                                } else {
                                    $('#QTD1LAMP').prop('checked', false);
                                    
                                }
                                $('#QTD1LAMP').bootstrapToggle();
                            break;
                            case "QTD2LAMP":
                                $('#QTD2LAMP').bootstrapToggle('destroy')
                                if (StatusAcionar === "ON"){
                                    $('#QTD2LAMP').prop('checked', true);
                                } else {
                                    $('#QTD2LAMP').prop('checked', false);
                                    
                                }
                                $('#QTD2LAMP').bootstrapToggle();
                            break;
                            case "SALALAMP":
                                $('#SALALAMP').bootstrapToggle('destroy')
                                if (StatusAcionar === "ON"){
                                    $('#SALALAMP').prop('checked', true);
                                } else {
                                    $('#SALALAMP').prop('checked', false);
                                }
                                $('#SALALAMP').bootstrapToggle();
                            break;
                            case "COZILAMP":
                                $('#COZILAMP').bootstrapToggle('destroy')
                                if (StatusAcionar === "ON"){
                                    $('#COZILAMP').prop('checked', true);
                                } else {
                                    $('#COZILAMP').prop('checked', false);
                                }
                                $('#COZILAMP').bootstrapToggle();
                            break;
                            case "VENTIL":
                                $('#VENTIL').bootstrapToggle('destroy')
                                if (StatusAcionar === "ON"){
                                    $('#VENTIL').prop('checked', true);
                                } else {
                                    $('#VENTIL').prop('checked', false);
                                }
                                $('#VENTIL').bootstrapToggle();
                            break;
                            case "PORTCARR":
                                $('#PORTCARR').bootstrapToggle('destroy')
                                if (StatusAcionar === "ON"){
                                    $('#PORTCARR').prop('checked', true);
                                } else {
                                    $('#PORTCARR').prop('checked', false);
                                }
                                $('#PORTCARR').bootstrapToggle();
                            break;
                            case "PORTSOCI":
                                $('#PORTSOCI').bootstrapToggle('destroy')
                                if (StatusAcionar === "ON"){
                                    $('#PORTSOCI').prop('checked', true);
                                } else {
                                    $('#PORTSOCI').prop('checked', false);
                                }
                                $('#PORTSOCI').bootstrapToggle();
                            break;
                            case "AREAEXTE":
                                $('#AREAEXTE').bootstrapToggle('destroy')
                                if (StatusAcionar === "ON"){
                                    $('#AREAEXTE').prop('checked', true);
                                } else {
                                    $('#AREAEXTE').prop('checked', false);
                                }
                                $('#AREAEXTE').bootstrapToggle();
                            break;
                            case "VARANDAC":
                                $('#VARANDAC').bootstrapToggle('destroy')
                                if (StatusAcionar === "ON"){
                                    $('#VARANDAC').prop('checked', true);
                                } else {
                                    $('#VARANDAC').prop('checked', false);
                                }
                                $('#VARANDAC').bootstrapToggle();
                            break;
                            case "JARDIMEXT":
                                $('#JARDIMEXT').bootstrapToggle('destroy')
                                if (StatusAcionar === "ON"){
                                    $('#JARDIMEXT').prop('checked', true);
                                } else {
                                    $('#JARDIMEXT').prop('checked', false);
                                }
                                $('#JARDIMEXT').bootstrapToggle();
                            break;
                            case "ALARME":
                                $('#ALARME').bootstrapToggle('destroy')
                                if (StatusAcionar === "ON"){
                                    $('#ALARME').prop('checked', true);
                                } else {
                                    $('#ALARME').prop('checked', false);
                                }
                                $('#ALARME').bootstrapToggle();
                            break;
                        }

                    }
                })
                 $('#Modal').modal('hide');
            }, 2000); // Esse processo é executado a cada 2 segundos.
    })