



const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

// Define your PDF URLs as environment variables or hardcode here
const BALI_PDF = process.env.BALI_PDF || 'https://drive.google.com/file/d/1SvSSBlG6mtQHbTKIusmi1G3JoTy-YQlV/view?usp=sharing';
const EBC_PDF = process.env.EBC_PDF || 'https://drive.google.com/file/d/1YlmmVzr7BmhbUy5cJtLSLrInwatSmINT/view?usp=sharing';
const ABC_PDF = process.env.ABC_PDF || 'https://drive.google.com/file/d/1BSPmeWLSl02WZgnamHT6FhjnbgQzOwbV/view?usp=sharing';

app.post('/whatsapp', (req, res) => {
  const msg = req.body.Body?.trim().toLowerCase();
  const twiml = new MessagingResponse();

  if (msg === 'hi' || msg === 'hello' || msg === 'start') {
    twiml.message(
      `👋 Welcome to Nomadller!

Please choose a tour package:
1. Bali Tour
2. Everest Base Camp Trek
3. Annapurna Base Camp Trek

👉 Reply with: *Bali*, *Everest*, or *Annapurna* to get your itinerary.`
    );
  } else if (msg === 'bali') {
    twiml.message(`📄 Here is your Bali itinerary: ${BALI_PDF}`);
  } else if (msg === 'everest' || msg === 'everest base camp' || msg === 'ebc') {
    twiml.message(`🏔️ Here is your Everest Base Camp Trek itinerary: ${EBC_PDF}`);
  } else if (msg === 'annapurna' || msg === 'annapurna base camp' || msg === 'abc') {
    twiml.message(`🏞️ Here is your Annapurna Base Camp Trek itinerary: ${ABC_PDF}`);
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
