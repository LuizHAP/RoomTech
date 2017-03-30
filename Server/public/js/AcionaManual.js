var socket = io.connect();
socket.on('QTD1LAMP', function(estado){
    if (estado === "ON"){
        $('#QTD1LAMP').bootstrapToggle('on');
    } else {
        $('#QTD1LAMP').bootstrapToggle('off');
    }
})
socket.on("QTD2LAMP", function(estado){
    if (estado === "ON"){
        $('#QTD2LAMP').bootstrapToggle('on');
    } else {
        $('#QTD2LAMP').bootstrapToggle('off');
    }
})
socket.on('SALALAMP', function(estado){
    if (estado === "ON"){
        $('#SALALAMP').bootstrapToggle('on');
    } else {
        $('#SALALAMP').bootstrapToggle('off');
    }
})
socket.on("COZILAMP", function(estado){
    if (estado === "ON"){
        $('#COZILAMP').bootstrapToggle('on');
    } else {
        $('#COZILAMP').bootstrapToggle('off');
    }
})
socket.on('AREAEXTE', function(estado){
    if (estado === "ON"){
        $('#AREAEXTE').bootstrapToggle('on');
    } else {
        $('#AREAEXTE').bootstrapToggle('off');
    }
})
socket.on('JARDIMEXT', function(estado){
    if (estado === "ON"){
        $('#JARDIMEXT').bootstrapToggle('on');
    } else {
        $('#JARDIMEXT').bootstrapToggle('off');
    }
})