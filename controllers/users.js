// //Login route get route and post
// router.get('/houses', async(req,res) => {
//     try{
//         //first to render before anything else
//         res.render('user/prompt.ejs', {
//         //if clicked on
//         res.redirect('user/index.ejs'
    
//             });
//     }catch(error){
//             res.send(error);
//         }
// });
// router.post('/houses', async(req, res)=>{
//     try{
//         //once submit login info as realtor
//         res.redirect('/realtor/._id/show.ejs')
//     //try
//         //if not current realtor, register now by clicking "register"
//         res.redirect('/join')
//         res.render('/user/join.ejs')
//     //try 
//         //if not a realtor and clicks on "click here"
//         res.redirect('/houses/index.ejs')
//     }catch(err){
//         res.send(err)
//     }
// })







// ////////////////////////
// const express = require('express');
// const router = express.Router();
// const User = require('../models/users');
// const bcrypt = require('../models/users')

//the login route is on houses/index.ejs --> render realtor profile
// router.get('/houses', (req,res) => {
//     res.render('realtor/edit.ejs' , {
//         message: req.session.message  //Sign in sucessful send to realtor edit.ejs
//     })
// });

// router.get('/login', (req, res)=>{
//     res.send('signup in')
// })

// //sign up hit a button that redirects to register
// router.post('/join', async(req,res) => {
//     const password = req.body.password;
//     const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//     console.log(passwordHash)
//     const userDbEntry = {};
//     userDbEntry.username = req.body.username;
//     userDbEntry.password = passwordHash;

//     try{
//         const createdUser = await User.create(userDbEntry);
//         req.session.logged = true;
//         req.session.usersDbId = createdUser.id;

//         res.redirect('/houses'); //if user created and logg in sucessful redirect to house index.ejs
//     }catch(error){
//         res.send(err);
//     }
// });



// //make form in index.ejs make a request to this
// router.post('/login', async(req,res) => {
//     try{
//         const foundUser = await User.findOne({'username': req.body.username});

//         //is the foundUser a realtor? truthy value if it is the realtor object
//         //if not === null and redirect to /join

//     if(foundUser){
//         if(bcrypt.compareSync(req.body.password, foundUser.password) ===true){
//             res.session.message = 'Sucessfully Logged In!';
//             req.session.logged = true;
//             req.session.usersDbId = foundUser._id;

//             console.log(req.session, 'realtor has sucessfully logged in')
//             res.redirect('/realtor/:id/edit');
//         }else {
//             req.session.message = "Username or password is incorrect";
//             res.redirect('/houses');
//         }
//         }else{
//             req.session.message = "Username or password is incorrect";
//             res.redirect('/houses');
//         }
//         } catch(error){
//              res.send(error)
//         }
// });

// //logout
// router.get('/logout', (req,res) => {
//     req.session.destory((error) =>{
//         if(err){
//             res.send(error);
//         }else{
//             res.redirect('/houses')
//         }
//     })
// })

// module.exports = router;