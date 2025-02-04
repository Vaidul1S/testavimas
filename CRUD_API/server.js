const express = require('express');
const app = express();

require('dotenv').config();

const port = 5555;

app.use(express.json());

const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

pool.on('error', (err, client) => {
    console.log('Something is wrong', err);
    process.exit(-1);    
});

module.exports = pool;  // konstanta priskiriam moduli, galime naudoti kituose scripuose ar panasiai


//-----------------------------Routes-----------------------------

app.get('/products', async (req, res) => {

    try {
        res.status(200).json({ message: 'Sėkmingai prisijungta' });
    } catch (error) {
        res.status(400).json({ error: 'error' });
    }

});

app.get('/users', (req, res) => {

    const usersDB = `
    SELECT * FROM users
    `;
    con.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({ result });
    });

});

app.listen(port, () => {
    console.log(`CRUD API darbui pasiruošus ant ${port} porto!`)
});