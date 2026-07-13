// Last 10 days 2D results
app.get('/api/2d-history', async (req, res) => {
  try {
    const { date } = req.query;

    const url = date
      ? `https://api.thaistock2d.com/2d_result?date=${encodeURIComponent(date)}`
      : 'https://api.thaistock2d.com/2d_result';

    const response = await axios.get(url, {
      timeout: 15000
    });

    let data = response.data;

    // Upstream API returns JSON as text sometimes
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch {
        // Keep original response if it is not valid JSON
      }
    }

    res.json(data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'History Data ဆွဲမရပါ',
      message: error.message
    });
  }
});
