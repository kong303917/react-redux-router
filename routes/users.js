var express = require('express');
var router = express.Router();
var qr = require('qr-image');
var fs = require('fs');
/* GET users listing. */
router.get('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
router.get('/login', function(req, res, next) {
  var loginRe = {};

  console.log(req.session);
  if(req.session.username=='zjy'){

  }
  else{
    if(req.query.username == 'zjy' && req.query.password=='111111'){

      loginRe.status = true;
      req.session.username='zjy';

    }
    else{
      loginRe.status = false;
    }

    console.log(req.session);
    console.log(res.header);
  }

  res.json(loginRe);
});


router.get('/logout', function (req, res, next) {
  req.session.username = null;
  res.json({
    status: true
  })
});

router.get('/qr', function (req, res, next) {
  var img = qr.imageSync(req.query.code, {
    'margin':1,
    'size':10,
    'ec_level':'Q'
  });
  const json={
    img:'data:image/png;base64,'+img.toString('base64')
  };
  res.json(json);
})

module.exports = router;
