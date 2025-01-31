const express = require('express');
const app = express();

const port = 5555;

app.use(express.json());

//-----------------------------Routes-----------------------------


app.listen(port, () => {
    console.log(`CRUD API darbui pasiruošus ant ${port} porto!`)
});