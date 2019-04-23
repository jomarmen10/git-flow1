const express = require('express');
const router = express.Router();
const House = require ('../models/houses');
//Need Realor models here const Realtor = require ('../models/realtors'); //replace Realtor/ allRealtors

//new route
router.get('/new', (req,res) => {
    res.render ('articles/new.ejs');
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
            res.redirect('/articles');
        }
    });
});
//show route
router.get('/:id', (req,res) => {
    House.findById(req.params.id, (err, foundHouse))
})



module.exports = router

