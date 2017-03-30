var socket = io.connect();
var atuador;
var status;
//função que é disparada quando é pressionado o botão
$(function() {
	$('#QTD1LAMP').change(function() {
		if ($(this).prop('checked') === true ){
			atuador = "QTD1LAMP"
            status = "ON"
			$.notify("Lampada do Quarto 1 acesa!", { globalPosition:"bottom", className: 'success'});
		} else {
            atuador = "QTD1LAMP"
            status = "OFF"
			$.notify("Lampada do Quarto 1 apagada!", { globalPosition:"bottom", className: 'error'});
		}
        socket.emit('atuador', atuador);
        socket.emit('status', status);
	})
})
$(function() {
	$('#QTD2LAMP').change(function() {
		if ($(this).prop('checked') === true ){
            atuador = "QTD2LAMP"
            status = "ON"
			$.notify("Lampada do Quarto 2 acesa!", { globalPosition:"bottom", className: 'success'});
		} else {
            atuador = "QTD2LAMP"
            status = "OFF"
			$.notify("Lampada do Quarto 2 apagada!", { globalPosition:"bottom", className: 'error'});
		}
        socket.emit('atuador', atuador);
        socket.emit('status', status);
	})
})
$(function() {
	$('#COZILAMP').change(function() {
		if ($(this).prop('checked') === true ){
			atuador = "COZILAMP"
            status = "ON"
			$.notify("Lampada da Cozinha acesa!", { globalPosition:"bottom", className: 'success'});
		} else {
			atuador = "COZILAMP"
            status = "OFF"
			$.notify("Lampada da Cozinha apagada!", { globalPosition:"bottom", className: 'error'});
		}
		socket.emit('atuador', atuador);
        socket.emit('status', status);
	})
})
$(function() {
	$('#SALALAMP').change(function() {
        var valor;
		if ($(this).prop('checked') === true ){
            atuador = "SALALAMP"
            status = "ON"
			$.notify("Lampada da Sala acesa!", { globalPosition:"bottom", className: 'success'});
            $( "#slider" ).slider( "option", "value", 100 );
            valor = "100"
            $( "#custom-handle" ).text = valor;
            $( "#slider" ).slider( "option", { disabled: false } );
		} else {
            atuador = "SALALAMP"
            status = "OFF"
			$.notify("Lampada da Sala apagada!", { globalPosition:"bottom", className: 'error'});
            $( "#slider" ).slider( "option", "value", 0 );
            $( "#slider" ).slider( "option", { disabled: true } );
		}
		socket.emit('atuador', atuador);
        socket.emit('status', status);
	})
})
$(function() {
	$('#VENTIL').change(function() {
		if ($(this).prop('checked') === true ){
            atuador = "VENTIL"
            status = "ON"
			$.notify("Ventilador ligado!", { globalPosition:"bottom", className: 'success'});
		} else {
            atuador = "VENTIL"
            status = "OFF"
			$.notify("Ventilador desligado!", { globalPosition:"bottom", className: 'error'});
		}
		socket.emit('atuador', atuador);
        socket.emit('status', status);
	})
})
$(function() {
	$('#VARANDAC').change(function() {
		if ($(this).prop('checked') === true ){
            atuador = "VARANDAC"
            status = "ON"
			$.notify("Lampadas da Varanda ligadas!", { globalPosition:"bottom", className: 'success'});
		} else {
            atuador = "VARANDAC"
            status = "OFF"
			$.notify("Lampadas da Varanda desligadas!", { globalPosition:"bottom", className: 'error'});
		}
		socket.emit('atuador', atuador);
        socket.emit('status', status);
	})
})
$(function() {
	$('#AREAEXTE').change(function() {
		if ($(this).prop('checked') === true ){
            atuador = "AREAEXTE"
            status = "ON"
			$.notify("Lampada dos Postes ligadas!", { globalPosition:"bottom", className: 'success'});
		} else {
            atuador = "AREAEXTE"
            status = "OFF"
			$.notify("Lampadas dos Postes desligadas!", { globalPosition:"bottom", className: 'error'});
		}
		socket.emit('atuador', atuador);
        socket.emit('status', status);
	})
})
$(function() {
	$('#JARDIMEXT').change(function() {
		if ($(this).prop('checked') === true ){
            atuador = "JARDIMEXT"
            status = "ON"
			$.notify("Lampadas do Jardim ligadas!", { globalPosition:"bottom", className: 'success'});
		} else {
            atuador = "JARDIMEXT"
            status = "OFF"
			$.notify("Lampadas do Jardim desligadas!", { globalPosition:"bottom", className: 'error'});
		}
		socket.emit('atuador', atuador);
        socket.emit('status', status);
	})
})
$(function() {
	$('#PORTCARR').change(function() {
		if ($(this).prop('checked') === true ){
            atuador = "PORTCARR"
            status = "ON"
			$.notify("Abrindo portao para o carro!", { globalPosition:"bottom", className: 'success'});
		} else {
            atuador = "PORTCARR"
            status = "OFF"
			$.notify("Fechando o portao para o carro!", { globalPosition:"bottom", className: 'error'});
		}
		socket.emit('atuador', atuador);
        socket.emit('status', status);
	})
})
$(function() {
	$('#PORTSOCI').change(function() {
		if ($(this).prop('checked') === true ){
            atuador = "PORTSOCI"
            status = "ON"
			$.notify("Abrindo Portao Social!", { globalPosition:"bottom", className: 'success'});
		} else {
            atuador = "PORTSOCI"
            status = "OFF"
			$.notify("Fechando Portao Social!", { globalPosition:"bottom", className: 'error'});
		}
		socket.emit('atuador', atuador);
        socket.emit('status', status);
	})
})