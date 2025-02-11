// const { response } = require("express");   --------------- uzkomentuoti, express knisa prota cypressui!!!!!!!!!!!!!!

describe('CRUD_API', () => {

    context('/products', () => {

        it('GET all productts', () => {
            cy.request("GET", "localhost:5555/products").then((res) => {
                expect(res.status).to.eq(200);
                cy.log(res.body);
                expect(res.body).length.to.greaterThan(0);
                expect(res.duration).to.lessThan(2000);
                expect(res.duration).to.below(500);
            });
        });

        it('Status check', () => {
            cy.request("GET", "localhost:5555/products").then((res) => {
                expect(res.status).to.eq(200);
            });
        });

        it('GET a single product', () => {
            cy.request("GET", "localhost:5555/products/5").then((res) => {
                expect(res.status).to.eq(200);                
                cy.log(res.body);
                cy.log(res.body.id);
                cy.log(res.body.name);
                cy.log(res.body.price);
                cy.log(res.body.description);
                expect(res.body).to.have.property('id', 5);
            });
        });

        it('CREATE a product', () => {
            cy.request("POST", "localhost:5555/products", {name: 'cyPreke', price: 0.99, description: 'pigi test preke'}).then((res) => {

                expect(res.status).to.eq(201);
                cy.log(res.body);
            });
        });

        it('UPDATE a product', () => {
            cy.request("PUT", "localhost:5555/products/6", {name: 'test', price: 1.99, description: 'pigi test preke'}).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('id', 6);
                cy.log(res.body);
            });
        });

        it('DELETE a product', () => {
            cy.request("DELETE", "localhost:5555/products/27").then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('message');
                cy.log(res.body);
            });
        });

    })
});
