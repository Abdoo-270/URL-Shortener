require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dns = require("dns");

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
  const { url } = req.body;
  // Check if the URL is valid
  validateURL(url)
    .then(() => {
      const shortID = shortid.generate();
      urlMap.set(shortID, url);
      res.json({ original_url: url, short_url: shortID });
    })
    .catch(() => {
      res.json({ error: "invalid url" });
    });
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

// Function to validate a URL using dns.lookup
function validateURL(url) {
  return new Promise((resolve, reject) => {
    const urlObject = new URL(url);
    const host = urlObject.hostname;

    dns.lookup(host, (err, address) => {
      if (err) {
        reject(err); // Host is not valid
      } else {
        resolve(); // Host is valid
      }
    });
  });
}

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
