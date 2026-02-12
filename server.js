const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// API base URL (unscrambled)
const API_BASE_URL = 'https://data.api.xweather.com/';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// Proxy endpoint for all weather API calls
app.get('/api/weather/*', async (req, res) => {
  try {
    const endpoint = req.params[0]; // Captures everything after /api/weather/
    const clientId = req.query.client_id;
    const clientSecret = req.query.client_secret;
    
    // Reconstruct the query string
    const queryParams = Object.keys(req.query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(req.query[key])}`)
      .join('&');
    
    const externalUrl = `${API_BASE_URL}${endpoint}?${queryParams}`;
    
    console.log(`Proxying request to: ${externalUrl}`);
    
    const response = await fetch(externalUrl);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
