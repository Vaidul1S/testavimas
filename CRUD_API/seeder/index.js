import { users } from './users.js';
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

con.query('DROP TABLE IF EXISTS sessions;'), (err) => {
    if (err) throw err;
}
con.query('DROP TABLE IF EXISTS clients;'), (err) => {
    if (err) throw err;
}

sql = `
    CREATE TABLE clients (
    id int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(32) NOT NULL,
    password varchar(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

con.query(sql, (err) => {
    if (err) throw err;
    console.log('Table Clients created!');
});