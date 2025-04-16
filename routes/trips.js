var express = require("express");
var router = express.Router();
var moment = require("moment");
const Trip = require("../models/trips");

router.get("/", (req, res) => {
  Trip.find().then((data) => {
    res.json({ data });
  });
});

router.post("/search", (req, res) => {
  if (!req.body.departure || !req.body.arrival || !req.body.date) {
    return res.json({
      result: false,
      message: "Trip not found",
    });
  }
  const date = moment.utc(req.body.date);
  const from = date.startOf("day").toDate();
  const to = date.endOf("day").toDate();

  Trip.find({
    departure: { $regex: new RegExp(req.body.departure, "i") },
    arrival: { $regex: new RegExp(req.body.arrival, "i") },
    date: { $gt: from, $lte: to },
  })
    .sort({ date: 1 })
    .then((trips) => {
      if (trips.length === 0) {
        return res.json({ result: false, message: "Trip not found" });
      } else {
        let dataTrip = [];
        for (let i = 0; i < trips.length; i++) {
          const tripFound = {
            departure: trips[i].departure,
            arrival: trips[i].arrival,
            date: trips[i].date,
            price: trips[i].price,
          };
          dataTrip.push(tripFound);
        }
        return res.json({ result: true, dataTrip });
      }
    });
});

module.exports = router;
