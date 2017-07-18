module.exports = (router)=>{
  router.get('/', function(req, res, next) {
    if(req.session.name) res.render('menu', { name:  req.session.name});
    return res.redirect("http://iwin247.kr:3003");
  });

  return router;
}
