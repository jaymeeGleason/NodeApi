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
        await pool.query("INSERT INTO profile (first_name, last_name) VALUES ($1, $2)", [firstName, lastName]);
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
        await pool.query("INSERT INTO product (persona_id, description) VALUES ($1, $2)", [personaId, description]);
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
        await pool.query("INSERT INTO persona (profile_id, first_name, last_name, latitude, longitude, interests) VALUES ($1, $2, $3, $4, $5, $6)", [profileId, firstName, lastName, latitude, longitude, interests]);
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

app.get('/persona', async(req, res) => {
        const { id } = req;
        
        try {
            const data = await pool.query("SELECT * FROM persona where id = $1", [id]);
            res.status(200).send(data);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
);

// Weather

app.get('/weather', async(req, res) => {    
    try {
        const url = await getWeather('https://api.weather.gov/points/38.8894,-77.0352');
        const weather = await getWeather(url.properties.forecast);
        res.status(200).send(weather.properties.periods);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
);

const options = { method: 'GET', headers: { accept: 'application/json' } };
const getWeather= async(url) => {
    const response =  await fetch(url);
    return await response.json();
}



app.listen(port, () => console.log(`Server has started on port: ${port}`));
