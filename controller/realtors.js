const express = require("express");
const router = express.Router();
const Realtors = require("../models/realtors");

router.get("/", (req, res) => {
  Realtors.find({}, (err, foundRealtors) => {
    if (err) {
      res.send(err);
    } else {
      res.render("realtors/index.ejs", {
        realtors: foundrealtor
      });
    }
  });
});

router.get("/new", (req, res) => {
  Realtors.find({}, (err, allRealtors) => {
    if (err) {
      res.send(err);
    } else {
      res.render("realtors/new.ejs", {
        realtor: allrealtors
      });
    }
  });
});

router.post("/", (req, res) => {
  Realtors.create(req.body, (err, newRealtors) => {
    if (err) {
      console.log(err);
    } else {
      console.log(newRealtors);
      res.redirect("/realtors");
    }
  });
});

router.get("/:id", (req, res) => {
  Realtors.findById(req.params.id, (err, showRealtors) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show.ejs", {
        realtor: showRealtors
      });
    }
  });
});

module.exports = router;
