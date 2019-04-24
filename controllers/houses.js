const express = require('express');
const router = express.Router();
const House = require ('../models/houses');
//Need Realor models here const Realtor = require ('../models/realtors'); //replace Realtor/ allRealtors

//new route
router.get('/new', (req,res) => {
    res.render ('houses/new.ejs');
});

//index route get route and post
router.get('/', (req,res) => {
    //res.render('houses/index.ejs');
    House.find({}, (err, foundHouses) => {
        if (err) {
            res.send(err);
        }else{
            res.render('houses/index.ejs', {
                houses: foundHouses
            });
        }
    });
});

router.post('/', (req,res) => {
    House.create(req.body, (err, createdHouse) => {
        if(err){
            res.send(err);
        }else{
            res.redirect('/houses');
        }
    });
});
//show route
router.get('/:id', (req,res) => {
    House.findById(req.params.id, (err, foundHouse) => {
        if (err) {
            res.send(err);
        }else{
            res.render('houses/show.ejs', {
                house:foundHouse
            });
        }
    });
});

//Edit route get and put req
router.get('/:id/edit', (req,  res) => {
    House.findById(req.params.id, (err, foundHouse) => {
        if(err){
            res.send(err);
        }else{
            res.render('houses/edit.ejs', {
                house:foundHouse
            });
        }
    });
});
router.put('/:id', (req, res)=> {
    House.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, foundHouse) => {
        if(err){
            res.send(err);
        }else{
            res.redirect('/houses');
        }
    });
});

//delete route
router.delete('/:id', (req,res) => {
    House.findByIdAndRemove(req.params.id, (err, deletedHouse) => {
        if(err){
            res.send(err);
        }else{
            res.redirect('/houses');
        }
    });
});


module.exports = router;

