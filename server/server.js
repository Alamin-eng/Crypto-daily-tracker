const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const staticData = require('./staticData.json')
// Enable CORS for all routes
app.use(cors());

// example of how to use external api using axios, async await and try ... catch to get data
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    res.send(response.data);
    
    // res.send(staticData)
    
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

const PORT = 3001



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
