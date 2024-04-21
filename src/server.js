const express = require('express');
const dotenv=require(dotenv);
dotenv.config(); 
const pool = require('./db');
const port = process.env.PORT;

const app = express();
app.use(express.json());

//routes
app.get('/', async(req, res) => {
    try {
        const data = await pool.query('SELECT * FROM widgetPersona');
        res.status(200).send( data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }});

app.post('/', async(req, res) => {
    const {firstName, lastName} = req.body;
    try {
        await pool.query('INSERT INTO widgetPersona (first_name, last_name) VALUES ($1, $2)', [firstName, lastName]);
        res.status(200).send({message: "Successfully added widget persona"});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/setup', async(req,res) => {
    try {
        await pool.query('CREATE TABLE widgetPersona (persona_id SERIAL PRIMARY KEY, first_name VARCHAR(100), last_name VARCHAR(100) )');
        res.status(200).send({message: "Successfully created table"});

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

app.listen(port, () => console.log(`Server has started on port: ${port}`));
