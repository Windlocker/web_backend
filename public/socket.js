var socket = io();
socket.on('connect', function(){
  socket.emit('add user', '익명');
});

socket.on('update message', function(username, msg){         
$('#system_log').append('<div id="system_log"><div class="w3-large w3-custom-box2 w3-animate-left" style="width:95vw;padding:5vw;margin:60px 10px 10px 10px"><h4 style="margin:0;font-weight:bold">CPU <i style="margin:0;color:lightgrey;font-size:14px;float:right">CPU 사양</i></h4><p style="margin-bottom:0;font-size:14px;">이용률 x% 속도 xGHZ</p></div><div class="w3-large w3-custom-box2 w3-animate-left" style="width:95vw;padding:5vw;margin:10px"><h4 style="margin:0;font-weight:bold">메모리 <i style="margin:0;color:lightgrey;font-size:14px;float:right">메모리 사양</i></h4><p style="margin-bottom:0;font-size:14px;">사용중 xGB 사용가능 xGB</p></div><div class="w3-large w3-custom-box2 w3-animate-left" style="width:95vw;padding:5vw;margin:10px"><h4 style="margin:0;font-weight:bold">디스크 <i style="margin:0;color:lightgrey;font-size:14px;float:right">디스크 사양</i></h4><p style="margin-bottom:0;font-size:14px;">이용률 x% 응답속도 xms</p></div></div>');
});
