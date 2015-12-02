var express = require('express');
var router = express.Router();
var sup = require('pg-supp');
var pg = require('pg');
var conString = process.env.DATABASE_URL;

router.get('/api/v1/memories', function(req, res, next) {
 pg.connect(conString, function(err, client, done) {
   if (err) {
     return console.error('error fetching client from pool', err);
   }
   console.log("connected to database");
   client.query('SELECT * FROM memories', function(err, result) {
     done();
     if (err) {
       return console.error('error running query', err);
     }
      res.send(result);
   });
 });
});

//INSERT ONE
router.post('/api/v1/memories', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    console.log(req.body);
    client.query('INSERT INTO memories(old_days, these_days, year) VALUES($1, $2, $3) returning id', [req.body.data.attributes.old_days, req.body.data.attributes.these_days, req.body.data.attributes.year], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
      //output: 1 
    });
  });
})

//GET ALL UNIQUE YEARS
router.get('/api/v1/memories/years', function(req, res, next) {
 pg.connect(conString, function(err, client, done) {
   if (err) {
     return console.error('error fetching client from pool', err);
   }
   console.log("connected to database");
   client.query('SELECT DISTINCT year FROM memories', function(err, result) {
     done();
     if (err) {
       return console.error('error running query', err);
     }
      res.send(result);
   });
 });
});

//GET ALL/:YEAR
router.get('/api/v1/memories/:id', function(req ,res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM memories WHERE year = $1', [req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
       res.send(result);
    });
  });
})

module.exports = router;
