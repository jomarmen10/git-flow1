const express = require("express");
const router = express.Router();
const Realtors = require("../models/realtors");

router.get("/", async (req, res) => {
  try {
    console.log("hit");
    const foundRealtors = await Realtors.find({});
    res.render("realtors/index.ejs", {
      realtor: foundRealtors
    });
  } catch (err) {
    res.send(err);
  }

  // console.log("route hit");
  // Realtors.find({}, (err, foundRealtors) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.render("realtors/index.ejs");
  //   }
  // });
});

// router.get("/new", (req, res) => {
//   Realtors.find({}, (err, allRealtors) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.render("realtors/new.ejs", {
//         realtor: allRealtors
//       });
//     }
//   });
// });

// router.post("/", (req, res) => {
//   Realtors.create(req.body, (err, newRealtors) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(newRealtors);
//       res.redirect("/realtor");
//     }
//   });
// });

// router.get("/:id", (req, res) => {
//   Realtors.findById(req.params.id, (err, showRealtors) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("realtors/show.ejs", {
//         realtor: showRealtors
//       });
//     }
//   });
// });

module.exports = router;
