import { users } from './users.js';
import { products } from './products.js';
import { comments } from './comments.js';
import mysql from 'mysql';
import md5 from 'md5';

users.forEach(user => {
    user.password = md5('123');
});

let sql;
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
});

con.connect(_ => console.log('Prisijungta prie duomenų bazės!'));

con.query('DROP TABLE IF EXISTS comments;'), (err) => {
    if (err) throw err;
}
con.query('DROP TABLE IF EXISTS users;'), (err) => {
    if (err) throw err;
}
con.query('DROP TABLE IF EXISTS products;'), (err) => {
    if (err) throw err;
}

sql = `
    CREATE TABLE users (
    id int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username varchar(32) NOT NULL,
    password varchar(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table Users created!');
});

sql = `
    CREATE TABLE products (
    id int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(32) NOT NULL,
    price int(11) NOT NULL,
    description text NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table Products created!');
});

sql = `
    CREATE TABLE comments (
    id int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int(11) UNSIGNED NOT NULL,
    date date NOT NULL,
    text text NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table Comments created!');
});

sql = `
    ALTER TABLE comments
    ADD CONSTRAINT comments_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id);
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table keys created!');
});

sql = `
    INSERT INTO users
    (id, username, password )
    VALUES ?
`;

con.query(sql, [users.map(user => [user.id, user.username, user.password])], (err) => {
    if (err) throw err;
    console.log('Data inserted into table Users!');
});

sql = `
    INSERT INTO comments
    (id, user_id, date, text )
    VALUES ?
`;

con.query(sql, [comments.map(comment => [comment.id, comment.user_id, comment.date, comment.text])], (err) => {
    if (err) throw err;
    console.log('Data inserted into table Comments!');
});

sql = `
    INSERT INTO products
    (id, name, price, description )
    VALUES ?
`;

con.query(sql, [products.map(product => [product.id, product.name, product.price, product.description])], (err) => {
    if (err) throw err;
    console.log('Data inserted into table Products!');
});

con.end(err => {
    if (err) throw err;
    console.log('Atsijungta nuo duomenų bazės!');
});