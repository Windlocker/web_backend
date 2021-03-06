module.exports = (router, Users)=>{
  router.get("/locked", (req, res)=>{
    Users.findOne({token: req.session.token}, (err, user)=>{
      if(err) return res.status(500).send("db err");
      if(user){
        if(user.open) return res.render('Locked', {name: req.session.name});
        else return res.render('notLock', {name: req.session.name});
      }else res.sendStatus(404);
    });
  });

  router.post('/', function(req, res, next) {
    Users.findOne({token: req.session.token}, (err, users)=>{
      if(err) res.status(500).send("DB err");
      if(users){
      Users.update({token: req.session.token},{$set: {"open": !users.open}}, (err, result)=>{
        if(err) return res.status(500).send("DB err");
        if(users) return res.status(200).send("su");
        else return res.status(412).send("nope");
      })
    }else return res.status(412).send("user not found");
    })
  })

  .get("/:token", (req, res)=>{
    Users.findOne({token: req.params.token}, (err, users)=>{
      if(err) res.status(500).send("DB err");
      if(users){
        if(users.open) return res.status(200).send("open");
        else return res.status(404).send("close");
      }
      else return res.status(412).send("user not found");
    });
  })

  .post("/restore", (req, res)=>{
      Users.findOne({token: req.body.token}, (err, users)=>{
          if(err) return res.status(500).send("err");
          if(users) return res.status(200).json({pincode:users.pincode});
      });
  });
  return router;
}
