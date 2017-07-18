module.exports = (router)=>{
  router.get('/', function(req, res, next) {
    if(req.session.name) return res.redirect("http://iwin247.kr:3003/main");
    res.render('index', { title: 'Express' });
  })

  return router;
}
