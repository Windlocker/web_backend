module.exports = (router, Users, io)=>{
  router.get('/', function(req, res, next) {
    io.on('connection', function(socket){
     var rooms = io.sockets.adapter.sids[socket.id]; for(var room in rooms) { socket.leave(room); }
     socket.room = req.session.token;
     socket.join(socket.room);
    });
    console.log(io.sockets.adapter.rooms);

    res.render('System', { name: req.session.name });
  })

  .post('/s', (req, res)=>{
   console.log(req.body.token);
    var html = '<div class="w3-large w3-custom-box2 w3-animate-left" style="width:95vw;padding:5vw;margin:60px 10px 10px 10px">'
    html+='<h4 style="margin:0;font-weight:bold">CPU <i style="margin:0;color:lightgrey;font-size:14px;float:right">'
    html+=req.body.CPU.model + "</i></h4>"
    html+='<p style="margin-bottom:0;font-size:14px;">사용율 &nbsp;&nbsp; <b style="font-size:20px;color:#00aaff">'+req.body.CPU.usage+'% </b> 속도 &nbsp;&nbsp;<b style="font-size:20px;color:#00aaff">'+req.body.CPU.left+'MHZ</b></p>'
    html+='</div>'

    html+='<div class="w3-large w3-custom-box2 w3-animate-left" style="width:95vw;padding:5vw;margin:10px">'
    html+='<h4 style="margin:0;font-weight:bold">메모리 <i style="margin:0;color:lightgrey;font-size:14px;float:right">'
    html+= req.body.Memory.model+'</i></h4>'
    html+= '<p style="margin-bottom:0;font-size:14px;">사용중 &nbsp;&nbsp; <b style="font-size:20px;color:#00aaff">' + req.body.Memory.usage+'</b> 사용가능 &nbsp;&nbsp; <b style="font-size:20px;color:#00aaff">'+ req.body.Memory.left +'</b></p></div>'

    html+='<div class="w3-large w3-custom-box2 w3-animate-left" style="width:95vw;padding:5vw;margin:10px">'
    html+='<h4 style="margin:0;font-weight:bold">디스크 <i style="margin:0;color:lightgrey;font-size:14px;float:right">'
    html+= req.body.Disk.model+'</i></h4>'
    html+= '<p style="margin-bottom:0;font-size:14px;">이용률&nbsp;&nbsp;<b style="font-size:20px;color:#00aaff">' + req.body.Disk.usage+'</b> 응답속도&nbsp;&nbsp; <b style="font-size:20px;color:#00aaff">'+ req.body.Disk.left +'xms</b></p></div>'
    io.sockets.in(req.body.token).emit("update spec", html);
    res.send(html);
  });


  return router;
}
