const express = require('express');
const router = express.Router();
const House = require ('../models/houses');
const Realtor = require ('../models/realtors'); //replace Realtor/ allRealtors

//new route
router.get('/new', async(req,res) => {
    try{
      const allRealtors = await Realtor.find({});
      res.render ('houses/new.ejs' ,{
          realtor:allRealtors
      });
    }catch(error){
        res.send(errorr);
    }
});
////////////////////////////////////////////////

//index route get route and post Working
router.get('/', async(req,res) => {
    try{
        const foundHouses = await House.find({});
        res.render('houses/index.ejs', {
         houses: foundHouses
            });
    }catch(error){
            res.send(error);
        }
});
/////////////////////////////////////////////// Working

router.post('/', (req, res)=>{
    House.create(req.body, (err, createdHouse)=>{
      if(err){
        res.send(err);
      } else {
        Realtor.findById(req.body.realtorId, (err, foundRealtor) => {
          console.log("===========================")
          console.log(foundRealtor, "<===found  foundRealtor in House Index Post");
          console.log("===========================")
          foundRealtor.houses.push(createdHouse);
          foundRealtor.save((err, savedRealtor) => {
            console.log('============================')
            console.log(savedRealtor, ' <---------- found savedRealtor in House Index post route');
            console.log('============================')
            res.redirect('/houses');
          }); 
        });  
      }
    });
  });
////////////////////////////////////////////////////////
//show route
//house show does render but dont see listed items again :(
router.get('/:id', (req, res)=>{
    Realtor.findOne({'houses': req.params.id})
        .populate({path: 'houses', match: {_id: req.params.id}})
        .exec((err, foundRealtor) => {
        console.log(foundRealtor, "<---- foundRealtor in Houses show route");
        res.render('houses/show.ejs', {
            realtor:foundRealtor,
            house:foundRealtor.houses[0]
            })
          })     
      });

/////Edit route get and put req//////////////////////////

router.get('/:id/edit', (req, res)=>{
   Realtor.find({}, (err, allRealtors) => {
     Realtor.findOne({'houses': req.params.id})
       .populate({path: 'houses', match: {_id: req.params.id}})
       .exec((err, foundHouseRealtor) => {
         console.log(foundHouseRealtor, "<==== foundHouseRealtor in edit get route")
         if(err){
           res.send(err);
         } else {
           res.render('houses/edit.ejs', {
             house: foundHouseRealtor.houses[0],
             realtor: allRealtors,
             houseRealtor: foundHouseRealtor
           })
         }
       })
 
   })
 });
 router.put('/:id', (req, res)=>{
     House.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedHouse)=>{
       Realtor.findOne({'houses': req.params.id}, (err, foundRealtor) => {
         if(foundRealtor._id.toString() !== req.body.realtorId){
           foundRealtor.houses.remove(req.params.id);
           foundRealtor.save((err, savedFoundRealtor) => {
             Realtor.findById(req.body.realtorId, (err, newRealtor) => {
               newRealtor.houses.push(updatedHouse);
               newRealtor.save((err, savedNewRealtor) => {
                 res.redirect('/houses/' + req.params.id);
               })
             })
        })
         } else {
           res.redirect('/houses/' + req.params.id)
         }
        })
    });
});
//delete route
router.delete('/:id', (req, res)=>{
    House.findByIdAndRemove(req.params.id, (err, deletedHouse)=>{
      Realtor.findOne({'houses': req.params.id}, (err, foundRealtor) => {
        if(err){
          res.send(err);
        } else {
          console.log(foundRealtor, "<---- foundRealtor in delete before  remove house id")
          foundRealtor.houses.remove(req.params.id);
          foundRealtor.save((err, updatedRealtor) => {
            console.log(updatedRealtor, 'mutation');
            res.redirect('/houses');
          });
        }
      });
    });
  });

//added
module.exports = router;
