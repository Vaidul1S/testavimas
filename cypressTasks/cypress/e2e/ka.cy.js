describe('ka', ()=> {
    it('ka', () => {
        cy.visit('https://www.krepsinis.net/naujiena/ambiciju-nemazinantis-d-gudelis-apie-ryto-prisikelima-g-ziemelio-norus-ir-botu-armija/341110');
        cy.get('data-item-id="15515386"').contains('.like-button').click();
    })
})