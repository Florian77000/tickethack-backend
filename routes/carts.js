var express = require("express");
var router = express.Router();

router.post("/", (req, res) => {
  Cart.findById(req.body.id)
    .populate("trips")
    .then((data) => {
      res.json({ resultat: true, trip: data });
    });
});

module.exports = router;
