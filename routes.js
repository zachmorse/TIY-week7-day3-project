const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb");
const ObjectId = require("mongodb").ObjectID;
const dbUrl = "mongodb://localhost:27017/robots";

let DB;
let PROFILEINFO;

// database connection

mongoClient.connect(dbUrl, function(err, db) {
  if (err) {
    console.warn("Error connecting to database", err);
  }

  DB = db;
  PROFILEINFO = db.collection("profileinfo");
});

// routes

router.get("/", (req, res) => {
  PROFILEINFO.find({}).toArray(function(err, foundPeople) {
    if (err) {
      res.status(500).send(err);
    }
    res.render("index", { userListing: foundPeople });
  });
});

router.get("/employed", (req, res) => {
  PROFILEINFO.find({ job: { $nin: [null] } }).toArray((err, foundPeople) => {
    if (err) {
      res.status(500).send(err);
    }
    res.render("index", { userListing: foundPeople });
  });
});

router.get("/seekingemployment", (req, res) => {
  PROFILEINFO.find({ job: null }).toArray((err, foundPeople) => {
    if (err) {
      res.status(500).send(err);
    }
    res.render("index", { userListing: foundPeople });
  });
});

router.get("/:id", function(req, res) {
  // var index = req.params.id - 1;
  PROFILEINFO.findOne(
    { _id: ObjectId(req.params.id) },
    (err, detailedProfile) => {
      if (err) {
        res.status(500).send(err);
      }
      res.render("details", { userListing: detailedProfile });
    }
  );
});

module.exports = router;
