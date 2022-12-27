const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + '/')); //css support

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// Export the Express API
module.exports = app;