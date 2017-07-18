module.exports = (router)=>{
  router.get('/', function(req, res, next) {
    if(req.session[req.body.id]) return res.redirect("http://iwin247.kr:3003/main");
    res.render('index', { title: 'Express' });
  })

  return router;
}
