var socket = io();
socket.on('connect', function(){
});

socket.emit('connect');


socket.on('update spec', function(html){         
$('#system_log').empty();
$('#system_log').append(html);
});
