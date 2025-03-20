const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware to inject environment variables into HTML
app.use((req, res, next) => {
    if (req.path === '/') {
        const fs = require('fs');
        let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
        
        // Inject environment variables as empty to avoid exposing them to client
        const envScript = `
            <script>
                window.ENV_OPEN_WEATHER_API_KEY = '';
                window.ENV_IQAIR_API_KEY = '';
            </script>
        `;
        
        // Insert the script just after the opening <head> tag
        html = html.replace('<head>', '<head>' + envScript);
        
        return res.send(html);
    }
    next();
});

// Proxy endpoint for IQAir API
app.get('/api/air-quality', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const response = await fetch(
            `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${process.env.IQAIR_API_KEY}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching air quality:', error);
        res.status(500).json({ error: 'Failed to fetch air quality data' });
    }
});

// Proxy endpoint for OpenWeather API
app.get('/api/weather/geo', async (req, res) => {
    try {
        const { q } = req.query;
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching geocoding:', error);
        res.status(500).json({ error: 'Failed to fetch geocoding data' });
    }
});

// Proxy endpoint for OpenWeather historical data
app.get('/api/weather/history', async (req, res) => {
    try {
        const { lat, lon, start, end } = req.query;
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${process.env.OPEN_WEATHER_API_KEY}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching historical data:', error);
        res.status(500).json({ error: 'Failed to fetch historical data' });
    }
});

// Serve static files
app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 