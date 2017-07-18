module.exports = (router, device)=>{
  router.get('/', function(req, res, next) {
    res.render('file', { name: req.session.name });
  });

  return router;
}
