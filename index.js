require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Generate a unique short ID
const shortid = require("shortid");

// Store mapping between short URLs and original URLs
const urlMap = new Map(); // Declare urlMap here

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", function (req, res) {
  const shortID = shortid.generate();

  const { url } = req.body;
  if (!url) {
    res.json({ error: "please provide a url" });
  } else {
    urlMap.set(shortID, url);

    res.json({ original_url: url, short_url: shortID });
  }
});
app.get("/api/shorturl/:short_url", (req, res) => {
  const { short_url } = req.params;

  // Check if the short URL exists in the mapping
  if (urlMap.has(short_url)) {
    // Redirect the user to the original URL
    const originalURL = urlMap.get(short_url);
    res.redirect(originalURL);
  } else {
    res.json({ error: "Short URL not found" });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
