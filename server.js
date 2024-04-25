const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

require('dotenv').config()

const port = process.env.PORT;
const pool = require('./db');

//routes
//Profile
app.post('/profile', async(req, res) => {
    const {firstName, lastName} = req.body;
    try {
        await pool.query("INSERT INTO profile (first_name, last_name) VALUES ($1, $2)", 
            [firstName, lastName]);
        res.status(200).send({message: "Successfully added profile"});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
//Product
app.post('/product', async(req, res) => {
    const {personaId, description} = req.body;
    try {
        await pool.query("INSERT INTO product (persona_id, description) VALUES ($1, $2)", 
            [personaId, description]);
        res.status(200).send({message: "Successfully added product"});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});
//Persona
app.post('/persona', async(req, res) => {
    const {profileId, firstName, lastName, latitude, longitude, interests} = req.body;
    try {
        await pool.query("INSERT INTO persona (profile_id, first_name, last_name, latitude, longitude, interests) VALUES ($1, $2, $3, $4, $5, $6)", 
            [profileId, firstName, lastName, latitude, longitude, interests]);
        res.status(200).send({message: "Successfully added persona"});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/personas', async(req, res) => {

    try {
        const data = await pool.query("SELECT * FROM persona");
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }});

app.get('/personas/:id', async(req, res) => {
        try {
            const personaRows = await pool.query("SELECT * FROM persona where id = $1", [req.params.id]);
            const persona = personaRows.rows ? personaRows.rows[0]: {};
            const weather = await 
                getWeather(`https://api.weather.gov/points/${persona.latitude},${persona.longitude}`);
            const forecast = weather ? await getWeather(weather.properties.forecast) : null;

            const temperature = weather && forecast && forecast.properties.periods 
                ? forecast.properties.periods[0].temperature : null;
            const city = weather && weather.properties 
                ? weather.properties.relativeLocation.properties.city : null;
            const state = weather && weather.properties 
                ? weather.properties.relativeLocation.properties.state : null;
            const data = {
                first_name: persona.first_name, 
                last_name: persona.last_name,
                longitude: persona.longitude,
                latitude: persona.latitude,
                temperature,
                city,
                state
            };
            res.status(200).send(data);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
);

// Weather testing

app.get('/weather', async(req, res) => {    

    try { const latitude = 38.8894;
        const longitude = -77.0352;
        const newUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
        const url = await getWeather(newUrl);
        //const url = await getWeather('https://api.weather.gov/points/38.8894,-77.0352');
        // const weather = await getWeather(url.properties.forecast);
        // const temperature = weather.properties.periods[0].temperature;
        // const city = url.properties.relativeLocation.properties.city;
        // const state = url.properties.relativeLocation.properties.state;
        res.status(200).send(url);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
);

const getWeather= async(url) => {
    const response =  await fetch(url);
    return response.json();
}



app.listen(port, () => console.log(`Server has started on port: ${port}`));
