const express = require("express");
const router = express.Router();
const House = require("../models/houses");
const Realtor = require("../models/realtors"); //replace Realtor/ allRealtors

//new route
router.get("/new", async (req, res) => {
  try {
    const foundRealtor = await Realtor.find({});
    res.render("houses/new.ejs", {
      realtors: foundRealtor
    });
  } catch (err) {
    res.send(err);
  }
});

//index route get route and post
router.get("/", async (req, res) => {
  try {
    const foundHouses = await House.find({});
    res.render("houses/index.ejs", {
      houses: foundHouses
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const createList = await House.create(req.body);
    res.redirect("/houses");
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const createList = await House.create(req.body);
    const findRealtor = await Realtor.findById(req.body.realtorId);
    await findRealtor.houses.push(createList);
    await findRealtor.save();
    res.redirect("/houses");
  } catch (err) {
    res.send(err);
  }
  //   router.post('/', async(req, res)=>{
  // try{
  //   const createArticle = await Article.create(req.body);
  //   const findAuthor = await Author.findById(req.body.authorId);
  //   await findAuthor.articles.push(createArticle);
  //   await findAuthor.save()
  //   res.redirect('/articles')
  // }catch(err){
  //   res.send(err)
  // }
});

//show route
router.get("/:id", async (req, res) => {
  try {
    const foundHouse = await Realtor.findOne({
      houses: req.params.id
    }).populate({ path: "houses", match: { _id: req.params.id } });
    res.render("houses/show.ejs", {
      house: foundHouse.houses[0],
      realtor: foundHouse
    });
  } catch (error) {
    res.send(error);
  }
});

//Edit route get and put req
router.get("/:id/edit", async (req, res) => {
  //'/:id/edit'
  try {
    const foundOne = await Realtor.findOne({ houses: req.params.id }).populate({
      path: "houses",
      match: { _id: req.params.id }
    });
    res.render("houses/edit.ejs", {
      house: foundOne.houses[0],
      realtor: foundOne
    });
  } catch (error) {
    res.send(error);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const foundHouse = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.redirect("/houses");
  } catch (error) {
    res.send(error);
  }
});

//delete route
router.delete("/:id", async (req, res) => {
  try {
    const deletedHouse = await House.findByIdAndRemove(req.params.id);
    const foundRealtor = await Realtor.findOne({ houses: req.params.id });
    await foundRealtor.houses.remove(req.params.id);
    await foundRealtor.save();
    res.redirect("/houses");
  } catch (error) {
    res.send(error);
  }
});

// router.delete('/:id', async(req, res)=>{
//   try{
//     const deleteArticle = await Article.findByIdAndRemove(req.params.id);
//     const foundAuthor = await Author.findOne({'articles': req.params.id});
//     await foundAuthor.articles.remove(req.params.id);
//     await foundAuthor.save();
//   }catch(err){
//     res.send(err)
//   }

//added
module.exports = router;
