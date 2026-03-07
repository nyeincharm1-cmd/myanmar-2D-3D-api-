const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

// ၂-လုံးထီ Live Data ကို ယူမယ့် Route
app.get('/api/2d-live', async (req, res) => {
    try {
        const response = await axios.get("https://api.thaistock2d.com/live");
        res.json(response.data); // ရလာတဲ့ Data ကို Front-end ဆီ ပြန်ပို့မယ်
    } catch (error) {
        res.status(500).json({ error: "Data ယူလို့မရပါ" });
    }
});

// ၂-လုံးထီ History Data ကို ယူမယ့် Route
app.get('/api/2d-history', async (req, res) => {
    try {
        const response = await axios.get("https://api.thaistock2d.com/2d_result");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "History Data ယူလို့မရပါ" });
    }
});

app.listen(3000, () => {
    console.log("2D API Server running on port 3000");
});
