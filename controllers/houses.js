const House = require('../models/houses');
const Realtor = require('../models/realtors');

module.exports = {
  newHouse,
  index,
  create,
  show,
  edit,
  update,
  deleteOne
}



async function newHouse(req,res){
  try {
    const foundRealtor = await Realtor.find({});
    res.render('houses/new.ejs', {
      realtors: foundRealtor
    })
    res.send('hello')
  } catch (err) {
    res.send(err)
  }
}



async function index(req, res){
  try {
    const foundHouses = await House.find({});
    const foundRealtor = await Realtor.findOne({});
    res.render('houses/index.ejs', {
      realtor: req.session.name,
      houses: foundHouses,
      message: req.session.message,
      logged: req.session.logged,
      profileId: req.session.realtorDbId
    })

  } catch (error) {
    res.send(error);
  }
}



async function create(req, res){
  try {
    const findRealtor = await Realtor.findById(req.session.realtorDbId);
    const createList = await House.create(req.body);
    findRealtor.houses.push(createList);
    findRealtor.save();
    res.redirect(`${createList._id}`)

  } catch (err) {
    res.send(err)
  }
}



async function show(req, res){
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
}


async function edit(req, res){
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
}



async function update(req, res){
  try {
    const foundHouse = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.redirect(`/realtor/${req.session.realtorDbId}`)
  } catch (error) {
    res.send(error);
  }
}



async function deleteOne(req, res){
  try {
    const deletedHouse = await House.findByIdAndRemove(req.params.id);
    const foundRealtor = await Realtor.findOne({
      'houses': req.params.id
    });
    await foundRealtor.houses.remove(req.params.id);
    await foundRealtor.save();
    res.redirect(`/realtor/${req.session.realtorDbId}`);
  } catch (error) {
    res.send(error);
  }
}
