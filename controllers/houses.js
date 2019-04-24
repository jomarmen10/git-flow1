const express = require('express');
const router = express.Router();
const House = require ('../models/houses');
//Need Realor models here const Realtor = require ('../models/realtors'); //replace Realtor/ allRealtors

//new route
router.get('/new', (req,res) => {
    res.render ('houses/new.ejs');
});

//index route get route and post
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


router.post('/', async(req, res)=>{
    try{
        console.log(req.body)
        const createList = await House.create(req.body);
        res.redirect('/houses')
    }catch(err){
        res.send(err)
    }
})

//show route
router.get('/:id', async(req,res) => {
    try{
    const foundHouse = await House.findById(req.params.id);
    res.render('houses/show.ejs', {
       house:foundHouse
    });
    }catch(error){
        res.send(error);
    }
});

//Edit route get and put req
router.get('/:id/edit', async(req,  res) => {   //'/:id/edit'
    try{
        console.log('edit route hit')
        const foundHouse = await House.findById(req.params.id);
        res.render('houses/edit.ejs', {
            house:foundHouse
        });
    }catch(error){
        res.send(error);
    }
});
router.put('/:id', async(req, res)=> {
    try{
        const foundHouse = await House.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.redirect('/houses' , {
          
        });
    }catch(error){
        res.send(error);
    }
});

//delete route
router.delete('/:id', async(req,res) => {
    try{
        const deletedHouse = await House.findByIdAndRemove(req.params.id);
        res.redirect('/houses');
    }catch(error){
        res.send(error);
    }
});

//added
module.exports = router;
