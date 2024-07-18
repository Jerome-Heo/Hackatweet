var express = require('express');
var router = express.Router();
require('../models/connection');
const User = require('../models/users');
const { checkBody } = require('../modules/checkBody');
const uid2 = require("uid2")
const bcrypt = require('bcrypt');

//Inscription + vérif de la saisie

router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  //Pas de user trouvé donc password hashé + token(32) 


  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: hash,
        token: uid2(32),

      })
      newUser.save().then((newDoc) => {
        res.json({ result: true, token: newDoc.token, username: req.body.username });
      });
    } else {

      res.json({ result: false, error: 'User already exists' });
    }
  }
  )
});

//Création du user dans BDD ou message d'erreur s'il existe déjà

//Connexion d'un user déjà existant + vérif de la saisie. 

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  //User trouvé dans la BDD avec les champs correspondants

  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token, username: req.body.username });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});



router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
