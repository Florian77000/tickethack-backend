var express = require("express");
var router = express.Router();
const Trip = require("../models/trips");

router.get("/", (req, res) => {
  Trip.find().then((data) => {
    res.json({ data });
  });
});

router.post("/search", (req, res) => {
  if (!req.body.departure || !req.body.arrival || !req.body.date) {
    return res.json({
      result: true,
      message: "merci de remplir tous les champs",
    });
  }
  Trip.findOne({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
    price: req.body.price,
  }).then((data) => {
    if (data) {
      return res.json({ result: true, message: "voyages trouvés" });
    } else {
      return res.json({ result: false, message: "aucun voyages trouvés" });
    }
  });
});

module.exports = router;
