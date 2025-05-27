// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace this with your actual Google Apps Script Web App URL
const SHEET_WEBHOOK = 'https://script.google.com/macros/s/AKfycbyjHXmICro5Rb0PfMv3ssi1gYvA822vP3pttgQCdtMgpUJ1w2totjn4hh5umne3A61RPg/exec';

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// Route to send location to Google Sheets
app.post('/save-location', async (req, res) => {
  const { latitude, longitude } = req.body;
  const timestamp = new Date().toISOString();

  try {
    const response = await fetch(SHEET_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ latitude, longitude, timestamp }),
    });

    const result = await response.json();
    console.log('Sent to Google Sheets:', result);

    res.status(200).send('Location saved to Google Sheets');
  } catch (error) {
    console.error('Error sending to Google Sheets:', error);
    res.status(500).send('Failed to send to Google Sheets');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
