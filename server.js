const express = require('express');
const cors = require('cors'); // (၁) ဒီမှာ ထည့်ရမှာပါ
const axios = require('axios');
const app = express();

app.use(cors()); // (၂) ဒါကိုပါ ထည့်ပေးရပါမယ် (ဘယ်သူမဆို ခေါ်လို့ရအောင်)

const port = process.env.PORT || 3000;

// 2D Live Data API
app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get('https://api.thaistock2d.com/live');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Live Data ဆွဲမရပါ" });
    }
});

// 2D History Data API
app.get('/api/2d-history', async (req, res) => {
    try {
        const response = await axios.get('https://api.thaistock2d.com/2d_history');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "History Data ဆွဲမရပါ" });
    }
});

app.listen(port, () => {
    console.log(`2D API Server running on port ${port}`);
});
