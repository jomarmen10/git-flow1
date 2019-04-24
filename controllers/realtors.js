const express = require("express");
const router = express.Router();
const Realtor = require("../models/realtors");

router.get("/", async (req, res) => {
  try {
    console.log("index hit ");
    const foundRealtors = await Realtor.find({});
    console.log("hit2");
    res.render("realtors/index.ejs", {
      realtor: foundRealtors
    });
  } catch (err) {
    res.send(err);
  }

  console.log("route hit");
  Realtors.find({}, (err, foundRealtors) => {
    if (err) {
      res.send(err);
    } else {
      res.render("realtors/index.ejs");
    }
  });
});

router.get("/new", (req, res) => {
  res.render("realtors/new.ejs");
});

router.get("/new", (req, res) => {
  Realtors.find({}, (err, allRealtors) => {
    if (err) {
      res.send(err);
    } else {
      res.render("realtors/new.ejs", {
        realtor: allRealtors
      });
    }
  });
});

router.post("/", async (req, res) => {
  try {
    const newRealtors = await Realtor.create(req.body);

    res.redirect("/realtor");
  } catch (err) {
    res.send(err);
  }
});

router.post("/", (req, res) => {
  Realtors.create(req.body, (err, newRealtors) => {
    if (err) {
      console.log(err);
    } else {
      console.log(newRealtors);
      res.redirect("/realtor");
    }
  });
});

router.get("/:id", async (req, res) => {
  try {
    const showRealtors = await Realtor.findById(req.params.id);

    res.render("realtors/show.ejs", {
      realtor: showRealtors
    });
  } catch (err) {
    res.send(err);
  }
});
router.get("/:id", (req, res) => {
  Realtors.findById(req.params.id, (err, showRealtors) => {
    if (err) {
      console.log(err);
    } else {
      res.render("realtors/show.ejs", {
        realtor: showRealtors
      });
    }
  });
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedRealtor = await Realtor.findByIdAndRemove(req.params.id);
    res.redirect("/realtor");
  } catch (err) {
    res.send(err);
  }
});

router.delete("/:id", (req, res) => {
  Realtors.findByIdAndRemove(req.params.id, (err, deletedRealtor) => {
    console.log(deletedRealtor, " this is deletedRealtor");
    res.redirect("/realtor");
  });
});

router.get("/:id/edit", async (req, res) => {
  try {
    const foundRealtor = await Realtor.findById(req.params.id);
    res.render("realtors/edit.ejs", {
      realtor: foundRealtor
    });
  } catch (err) {
    res.send(err);
  }
  Realtors.findById(req.params.id, (err, foundRealtors) => {
    res.render("edit.ejs", {
      realtor: foundRealtors
    });
  });
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRealtors = await Realtor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );
    res.redirect("/realtor");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
