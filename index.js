const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.post('/whatsapp', (req, res) => {
  const twiml = new MessagingResponse();
  const userMsg = req.body.Body.toLowerCase();

  if (userMsg === 'hi') {
    const message = twiml.message();
    message.body('Welcome to Nomadller! Please choose a tour package:');

    message.addButton({ type: 'quick_reply', title: 'Bali', id: 'bali_package' });
    message.addButton({ type: 'quick_reply', title: 'Kerala', id: 'kerala_package' });
    message.addButton({ type: 'quick_reply', title: 'Thailand', id: 'thailand_package' });
    message.addButton({ type: 'quick_reply', title: 'Japan', id: 'japan_package' });
    message.addButton({ type: 'quick_reply', title: 'Vietnam', id: 'vietnam_package' });
    message.addButton({ type: 'quick_reply', title: 'Everest Base Camp', id: 'ebc_package' });

  } else if (userMsg === 'bali' || userMsg === 'bali_package') {
    twiml.message('Here is your Bali itinerary: https://yourpdfurl.com/bali.pdf');
  } else if (userMsg === 'kerala' || userMsg === 'kerala_package') {
    twiml.message('Here is your Kerala itinerary: https://yourpdfurl.com/kerala.pdf');
  } else if (userMsg === 'thailand' || userMsg === 'thailand_package') {
    twiml.message('Here is your Thailand itinerary: https://yourpdfurl.com/thailand.pdf');
  } else if (userMsg === 'japan' || userMsg === 'japan_package') {
    twiml.message('Here is your Japan itinerary: https://yourpdfurl.com/japan.pdf');
  } else if (userMsg === 'vietnam' || userMsg === 'vietnam_package') {
    twiml.message('Here is your Vietnam itinerary: https://yourpdfurl.com/vietnam.pdf');
  } else if (userMsg === 'everest base camp' || userMsg === 'ebc_package') {
    twiml.message('Here is your Everest Base Camp itinerary: https://yourpdfurl.com/everest_base_camp.pdf');
  } else {
    twiml.message("Sorry, I didn't understand that. Please choose a package.");
  }

  res.type('text/xml').send(twiml.toString());
});
