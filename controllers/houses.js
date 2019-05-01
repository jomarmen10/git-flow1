const express = require("express");
const router = express.Router();

const House = require('../models/houses');
const Realtor = require('../models/realtors'); //replace Realtor/ allRealtors

//new route
router.get('/new', async (req, res) => {
  try {
    const foundRealtor = await Realtor.find({});
    res.render('houses/new.ejs', {
      realtors: foundRealtor
    })
  } catch (err) {
    res.send(err)
  }
});
///////////////////////////////////////////////
// index route get route and post Working
router.get('/', async (req, res) => {
  try {
    const foundHouses = await House.find({});
    const foundRealtor = await Realtor.findOne({});
    res.render('houses/index.ejs', {
      realtor: req.session.name,
      houses: foundHouses,
      message: req.session.message,
    })

  } catch (error) {
    res.send(error);
  }
});

// router.get('/signin', (req, res)=>{
//   res.render('houses/signin.ejs')
// })


router.post('/', async (req, res) => {
  try {

    const findRealtor = await Realtor.findById(req.session.realtorDbId);
    const createList = await House.create(req.body);
    console.log(findRealtor)
    findRealtor.houses.push(createList);
    findRealtor.save();
    console.log("house pushed and realtor saved")
    res.redirect('/houses')
  } catch (err) {
    res.send(err)
  }
});

//show route
router.get('/:id', async (req, res) => {
  try {
    const foundHouse = await Realtor.findOne({
      'houses': req.params.id
    }).populate({
      path: 'houses',
      match: {
        _id: req.params.id
      }
    })

    res.render('houses/show.ejs', {
      house: foundHouse.houses[0],
      realtor: foundHouse,
      logged: req.session.logged,

    });
  } catch (error) {
    res.send(error);
  }
});


//Edit route get and put req
router.get('/:id/edit', async (req, res) => { //'/:id/edit'
  try {
    const foundOne = await Realtor.findOne({
      'houses': req.params.id
    }).populate({
      path: 'houses',
      match: {
        _id: req.params.id
      }
    })
    res.render('houses/edit.ejs', {
      house: foundOne.houses[0],
      realtor: foundOne
    });
  } catch (error) {
    res.send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const foundHouse = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.redirect('/houses')
  } catch (error) {
    res.send(error);
  }
});


//delete route
router.delete('/:id', async (req, res) => {
  try {
    const deletedHouse = await House.findByIdAndRemove(req.params.id);
    const foundRealtor = await Realtor.findOne({
      'houses': req.params.id
    });
    await foundRealtor.houses.remove(req.params.id);
    await foundRealtor.save();
    res.redirect('/houses');
  } catch (error) {
    res.send(error);
  }
});


//added
module.exports = router;
