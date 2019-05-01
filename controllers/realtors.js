const express = require("express");
const router = express.Router();
const Realtor = require("../models/realtors");
const House = require("../models/houses");

router.get("/", async (req, res) => {
  try {
    const foundRealtors = await Realtor.find({});
    res.render("realtors/index.ejs", {
      realtor: foundRealtors
    });
  } catch (err) {
    res.send(err);
  }
});

router.get("/new", (req, res) => {
  res.render("realtors/new.ejs");
});

router.post("/", async (req, res) => {
  try {
    const newRealtors = await Realtor.create(req.body);
    res.redirect("/realtor");
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const showRealtors = await Realtor.findById(req.params.id).populate(
      "houses"
    ).exec();
    let current;
    if(req.session.logged){
      if(showRealtors._id.toString() === req.session.realtorDbId.toString()){
        current = true
      }
    }
    res.render("realtors/show.ejs", {
      realtor: showRealtors,
      current
    });
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedRealtor = await Realtor.findByIdAndRemove(req.params.id);
    const deleteHouse = await House.deleteMany({
      _id: {
        $in: deletedRealtor.houses
      }
    });
    res.redirect("/realtor");
  } catch (err) {
    res.send(err);
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const foundRealtor = await Realtor.findById(req.params.id);
    if (foundRealtor._id.toString() === req.session.realtorDbId){
      res.render("realtors/edit.ejs", {
        realtor: foundRealtor,
        id: req.params.id
      });
    } else {
      res.redirect(`/realtor/${req.params.id}`)
    }
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRealtors = await Realtor.findByIdAndUpdate(
      req.params.id,
      req.body, {
        new: true
      }
    );
    res.redirect("/realtor");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
