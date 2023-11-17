const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

 // Import the 'node-fetch' library
const app = express();
const port = 3000;
async function getWeather() {
  const apiKey = process.env.API_KEY;


  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const city = "melrose";

  const url = `${baseUrl}?appid=${apiKey}&q=${city}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}
app.use(cors());

app.get('/weather', async (req, res) => {
  try {
    // Call the getWeather function to fetch weather data
    const weatherData = await getWeather();

    // Send the weather data as JSON in the response
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`);
});
