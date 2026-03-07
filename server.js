const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

// 1. Live Data API
app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get('https://api.thaistock2d.com/live');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Live Data ဆွဲမရပါ" });
    }
});

// 2. History Data API (ဒါလေးရှိမှ History တက်မှာပါ)
app.get('/api/2d-history', async (req, res) => {
    try {
        const response = await axios.get('https://api.thaistock2d.com/2d_history');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "History Data ဆွဲမရပါ" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
