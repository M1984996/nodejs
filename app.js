const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.FMP_API_KEY;

app.use(cors());

app.use("/fmp/*", async (req, res) => {
  const fmpPath = req.originalUrl.replace("/fmp/", ""); // strip "/fmp/"
  const fmpUrl = `https://financialmodelingprep.com/${fmpPath}`;

  try {
    const response = await axios.get(fmpUrl, {
      params: { ...req.query, apikey: API_KEY },
    });
    res.json(response.data);
  } catch (err) {
    console.error("FMP Proxy error:", err.message);
    res.status(500).json({ error: "Failed to fetch FMP data" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy running on port ${PORT}`);
});
