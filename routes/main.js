const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Andrew!");
});
router.post("/", (req, res) => {
  res.send("Got a POST request");
});

module.exports = router;
