const express = require("express");
const router = express.Router();

router.put("/", (req, res) => {
  res.send("Got a PUT request at /user");
});

router.delete("/", (req, res) => {
  res.send("Got a DELETE request at /user");
});

module.exports = router;
