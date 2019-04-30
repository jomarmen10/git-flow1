const express = require('express');
const router = express.Router();
const Realtor = require("../models/realtors");
const House = require ('../models/houses');
const bcrypt = require('bcryptjs');
let user = null;

router.get('/login', (req, res, next) => {
  res.render('login.ejs',
   { message: req.session.message})
});

router.post('/register', async (req, res) => {
  const password = req.body.password;
  console.log('======pw======')
  console.log("password", req.body.password)
  console.log('======pw======')
  console.log('======username======')
  console.log("username",req.body.username)
  console.log('======username======')
  console.log('======name======')
  console.log(req.body.name)
  console.log('======name======')
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const realtorDbEntry = {};
  realtorDbEntry.username = req.body.username;
  realtorDbEntry.password = passwordHash;
  realtorDbEntry.name = req.body.name;
  realtorDbEntry.email = req.body.email;
  realtorDbEntry.number = req.body.number;
  try {
    const createdRealtor = await Realtor.create(realtorDbEntry);
    console.log("realtor created")
    req.session.logged = true;
    req.session.realtorDbId = createdRealtor._id;
    console.log("redirecting..")
    res.redirect('/houses')
    // res.redirect(`/realtor/${createdRealtor._id}`);

  } catch(err){
    res.send(err)
  }
});

router.post('/login', async (req, res) => {
  try {
    const foundRealtor = await Realtor.findOne({'username': req.body.username});
    console.log(foundRealtor)
    // const foundRealtorPassword = Realtor.password.findOne({passwordHash:req.body.password})
    if(foundRealtor){
      console.log("comparing password")
      if(bcrypt.compareSync(req.body.password, foundRealtor.password)){
        console.log("password is valid")
        req.session.message = 'You sucessfully logged in';
        req.session.logged = true;
        req.session.realtorDbId = foundRealtor._id;

        console.log(req.session, ' successful in login')
        res.redirect(`/realtor/${foundRealtor._id}`);  //house index
      if(!foundRealtor){

      }
      } else {
        console.log(foundRealtor.password)
        console.log(req.body.password)
        req.session.message = "Username or password is incorrect";
        res.redirect('/houses');
      }
    } else{
      req.session.message = 'Username or Password is incorrect';
      res.redirect('/houses');
    }
  } catch(err){
    res.send(err);
    console.log('login didnt hit')
  }

});



/////////Working ok//////
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.send(err);
    } else {
      console.log(req.session, 'logged out')
      res.redirect('/auth/login');
      //req.session.message;

    }
  })
})




module.exports = router;
