const { faker } = require('@faker-js/faker');
const fs = require('fs');

//Sugeneruoti netikra varda ir pavarde
let randomName = faker.person.firstName();
let randomSurname = faker.person.lastName();

function generateUser() {
    return {
        "name": faker.person.firstName(),
        "surname": faker.person.lastName(),
        "phone": faker.phone.number(),
        "email": faker.internet.email(),
        "username": faker.internet.username(),
        "password": faker.internet.password(),
        "birthdate": faker.date.past()
    }
}

function generateProduct() {
    return {
        "title": faker.commerce.product(),
        "description": faker.commerce.productDescription(),
        "price": faker.commerce.price()
    }
}

function generateCategory() {
    return {
        "title": faker.commerce.department(),
        "description": faker.commerce.productDescription()
    }
}

function generateToy() {
    return {
        "title": faker.commerce.product(),
        "description": faker.commerce.productDescription(),
        "price": faker.commerce.price()
    }
}

function generateCompany() {
    return {
        "title": faker.commerce.department()
    }
}

const users = Array.from({ length: 100 }, generateUser);
const products = Array.from({ length: 100 }, generateProduct);
const categories = Array.from({ length: 100 }, generateCategory);
const toys = Array.from({ length: 100 }, generateToy);
const companies = Array.from({ length: 10 }, generateCompany);

fs.writeFileSync('generated_files/users.json', JSON.stringify(users, null, 4));
fs.writeFileSync('generated_files/products.json', JSON.stringify(products, null, 4));
fs.writeFileSync('generated_files/categories.json', JSON.stringify(categories, null, 4));
fs.writeFileSync('generated_files/toys.json', JSON.stringify(toys, null, 4));
fs.writeFileSync('generated_files/companies.json', JSON.stringify(companies, null, 4));


const csvHeader = Object.keys(users[0]).join(',') + '\n';
let csvRows = "";

// const csvRows = users.map(user => 
//     Object.values(user).map(value => 
//       typeof value === 'object' ? JSON.stringify(value).replace(/,/g, ';') : value
//     ).join(',')
//   ).join('\n');

for (let i = 0; i < users.length; i++) {
    let csvRow = Object.values(users[i]).join(',') + '\n';
    csvRows += csvRow;
}

fs.writeFileSync('generated_files/users.csv', csvHeader + csvRows);
