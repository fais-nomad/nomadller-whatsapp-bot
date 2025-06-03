const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
const PDF_URL = process.env.PDF_URL;

app.post('/whatsapp', (req, res) => {
  const msg = req.body.Body?.trim().toLowerCase();
  const twiml = new MessagingResponse();

  if (msg === 'hi' || msg === 'hello' || msg === 'start') {
    twiml.message(
      `👋 Welcome to Nomadller!

Please choose a tour package:
1. Bali Tour

👉 Reply with: *Bali* to get your itinerary.`
    );
  } else if (msg === 'bali') {
    twiml.message(`📄 Here is your Bali itinerary: ${PDF_URL}`);
  } else {
    twiml.message(`❓ Sorry, I didn't understand that.

Type *Hi* to see available packages.`);
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Nomadller bot is running on port ${PORT}`);
});