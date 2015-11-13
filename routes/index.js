var express = require('express');
var router = express.Router();
var sup = require('pg-supp');

router.post('/api/v1/memories', function(req, res, next) {
  sup.insert("memories", ["old_days", "these_days", "year"], ["Had to use a flip phone", "Tablet at age 2", "1994"]);
  res.send("success");
})

module.exports = router;
