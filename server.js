const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'Server is running',
    routes: [
      '/api/data',
      '/api/2d-history'
    ]
  });
});

// Current live data
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.thaistock2d.com/live',
      {
        timeout: 15000,
        headers: {
          Accept: 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Live Data ဆွဲမရပါ',
      message: error.message
    });
  }
});

// Last results or results by date
app.get('/api/2d-history', async (req, res) => {
  try {
    const { date } = req.query;

    const response = await axios.get(
      'https://api.thaistock2d.com/2d_result',
      {
        timeout: 15000,
        headers: {
          Accept: 'application/json'
        },
        params: date ? { date } : {}
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'History Data ဆွဲမရပါ',
      message: error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
