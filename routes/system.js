module.exports = (router, Users, io)=>{
  router.get('/', function(req, res, next) {
    res.render('System', { name: req.session.name });
  })
  .get('/test', (req, res)=>{
    io.emit("update message");
  });


  return router;
}
