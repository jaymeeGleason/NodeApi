const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config()

const port = process.env.PORT;
const pool = require('./db');

//routes
app.get('/getPersonas', async(req, res) => {
    try {
        const data = await pool.query('SELECT * FROM persona');
        res.status(200).send( data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }});

app.post('/createPersona', async(req, res) => {
    const {firstName, lastName, latitude, longitude} = req.body;
    try {
        await pool.query(`INSERT INTO persona (first_name, last_name, latitude, longitude) VALUES ('Lisa', 'Young', 123.45678, 234.34567)`);
        res.status(200).send({message: "Successfully added persona"});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
