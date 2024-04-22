const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config()

const port = process.env.PORT;
const pool = require('./db');

//routes
app.get('/personas', async(req, res) => {
    try {
        const data = await pool.query("SELECT * FROM persona");
        console.log(data);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }});

app.post('/persona', async(req, res) => {
    const {firstName, lastName, latitude, longitude} = req.body;
    try {
        await pool.query("INSERT INTO persona (first_name, last_name, latitude, longitude) VALUES ($1, $2, $3, $4)", [firstName, lastName, latitude, longitude]);
        res.status(200).send({message: "Successfully added persona"});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
