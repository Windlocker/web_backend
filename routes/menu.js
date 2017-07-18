module.exports = (router)=>{
  router.get('/', function(req, res, next) {
    res.render('menu', { title: 'Express' });
  });

  return router;
}
