const express = require('express');
const router = express.Router();
const User   = require('../models/users');
const bcrypt = require('bcryptjs');


router.get('/login', (req, res) => {
  res.render('login.ejs', {
    message: req.session.message
  })
});



router.post('/register', async (req, res) => {

  
  const password = req.body.password;
  console.log("password", req.body.password)
  console.log("username",req.body.username)
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));


  const userDbEntry = {};
  userDbEntry.username = req.body.username;
  userDbEntry.password = passwordHash;

  try {
    const createdUser = await User.create(userDbEntry);

 
    req.session.logged = true;
    req.session.usersDbId = createdUser._id;

    res.redirect('/houses');

  } catch(err){
    res.send(err)
  }



});



router.post('/login', async (req, res) => {

 
  try {
    const foundUser = await User.findOne({'username': req.body.username});

 
    if(foundUser){

     
      if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
       
        res.session.message = '';
        req.session.logged = true;
        req.session.usersDbId = foundUser._id;

        console.log(req.session, ' successful in login')
        res.redirect('/houses');  //house index

      } else {
     console.log(foundUser.password)
     console.log(req.body.password)
        req.session.message = "Username or password is incorrect";
        res.redirect('/auth/login');
      }

    } else {
2
      req.session.message = 'Username or Password is incorrect';

      res.redirect('/auth/login');
    }


  } catch(err){
    res.send(err);
  }





});


router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      res.redirect('/auth/login');
    }
  })
})




module.exports = router;