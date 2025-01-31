const express = require('express');
const app = express();

const port = 5555;

app.use(express.json());

//-----------------------------Routes-----------------------------

app.get('/products', async (req, res) => {
    try {
        res.status(200).json({message: 'Sėkmingai prisijungta'});
    } catch (error) {
        res.status(400).json({error: 'error'});
    }
    
});

app.listen(port, () => {
    console.log(`CRUD API darbui pasiruošus ant ${port} porto!`)
});