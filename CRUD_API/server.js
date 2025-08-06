const express = require('express');
const app = express();
const mysql = require('mysql');

const port = 5555;

app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});

con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Prisijungta prie duomenų bazės!');
});

//-----------------------------Routes-----------------------------

// app.get('/users', (req, res) => {

//     try {
//         const sql = `SELECT * FROM users`;
//         con.query(sql, (err, result) => {
//             if (err) {
//                 res.status(500).json({ error: err.message });
//                 return;
//             }});

//             res.json(result);

//     } catch (error) {
//         res.status(400).json({ error: 'error' });
//     }

// });

// app.get('/users/:id', async (req, res) => {

//     try {
//         const id = req.params.id
//         const results = await con.query(`SELECT * FROM users WHERE id=${id}`);
//         res.status(200).json(results.rows);

//     } catch (error) {
//         res.status(400).json({ error: 'error' });
//     }

// });

// app.post('/users', async (req, res) => {

//     try {
//         const { id, username, password } = req.body;

//         const results = await con.query(`INSERT INTO users (id,username, password) VALUES (${id}, '${username}', '${password}') RETURNING *`);
//         res.status(201).json(results.rows[0]);

//     } catch (error) {
//         res.status(400).json({ error: 'error' });
//     }

// });

// app.put('/users/:id', async (req, res) => {

//     try {
//         const id = req.params.id;
//         const { username, password } = req.body;
//         const results = await con.query(`UPDATE users SET username='${username}', password='${password}' WHERE id=${id} RETURNING *`);
//         res.status(200).json(results.rows[0]);

//     } catch (error) {
//         res.status(400).json({ error: 'error' });
//     }

// });

// app.delete('/users/:id', async (req, res) => {

//     try {
//         const id = req.params.id
//         const results = await con.query(`DELETE FROM users WHERE id=${id} RETURNING *`);
//         res.status(200).json(results.rows);

//     } catch (error) {
//         res.status(400).json({ error: 'error' });
//     }

// });

app.get('/products', (req, res) => {

    const sql = `SELECT * FROM products`;
    con.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(result);
    });
});

app.get('/products/:id', (req, res) => {

    const id = req.params.id
    const sql = `
            SELECT * FROM products 
            WHERE id=${id}
            `;

    con.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(result[0]);

    });
});

app.post('/products', async (req, res) => {

    const { name, price, description } = req.body;
    const sql = `
            INSERT INTO products (name, price, description) 
            VALUES ('${name}', ${price}, '${description}')
            `;

    con.query(sql, { name, price, description }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json(result);
    });
});

app.put('/products/:id', (req, res) => {

    const { id } = req.params;
    const { name, price, description } = req.body;
    const sql = `
            UPDATE products 
            SET name='${name}', price='${price}', description='${description}' 
            WHERE id=${id}
            `;

    con.query(sql, { name, price, description, id }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        con.query(`SELECT * FROM products WHERE id = ?`, [id], (err2, rows) => {
            if (err2) {
                return res.status(500).json({ error: err2.message });
            }

            res.status(200).json(rows[0]);
        });
    });
});

app.delete('/products/:id', async (req, res) => {

    const { id } = req.params;
    const sql = `
            DELETE FROM products 
            WHERE id=${id} 
            `;

    con.query(sql, { id }, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({message: 'Produktas ištrintas sėkmingai!'});
    });
});

app.listen(port, () => {
    console.log(`CRUD API duonbaze darbui pasiruošus ant ${port} porto!`)
});