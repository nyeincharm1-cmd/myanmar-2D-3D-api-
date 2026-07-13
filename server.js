const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'Server is running',
    routes: ['/api/data', '/api/2d-history']
  });
});

// Live data
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.thaistock2d.com/live',
      { timeout: 15000 }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Live Data ဆွဲမရပါ',
      message: error.message
    });
  }
});

// History data
app.get('/api/2d-history', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.thaistock2d.com/2d_history',
      { timeout: 15000 }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'History Data ဆွဲမရပါ',
      message: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
