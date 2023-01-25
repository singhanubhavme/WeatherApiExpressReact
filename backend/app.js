const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: '*' }));

const Cities = require('./Cities.json');
const OPENWEATHER_URL = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = process.env.API_KEY;

const getPagination = (page) => {
    const PAGESIZE = 10;
    const startIndex = (page * PAGESIZE) - PAGESIZE;
    const endIndex = (page * PAGESIZE) - 1;
    return ({ startIndex, endIndex });
}

app.get("/getAllCities", (req, res) => {
    res.json(Cities);
});

app.get("/getWeatherInfo/:lat/:lng", async (req, res) => {
    const { lat, lng } = req.params;
    const data = await axios
        .get(`${OPENWEATHER_URL}?lat=${lat}&lon=${lng}&appid=${API_KEY}`);
    res.json(data.data);
});

app.get("/getWeather/:page", async (req, res) => {
    const { page } = req.params;
    const { startIndex, endIndex } = getPagination(page);
    const result = [];
    let lat, lng, data;
    for (let i = startIndex; i <= endIndex; i++) {
        lat = Cities[i].lat;
        lng = Cities[i].lng;
        data = await axios
            .get(`${OPENWEATHER_URL}?lat=${lat}&lon=${lng}&appid=${API_KEY}`);
        result.push(data.data);
    }
    res.json(result);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));