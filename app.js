const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan());

// Routing
app.use("/", require("./routes/main"));
app.use("/user", require("./routes/users"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
