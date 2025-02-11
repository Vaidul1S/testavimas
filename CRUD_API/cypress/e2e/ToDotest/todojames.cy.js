describe('ToDoTest', () => { 

    it('visit ToDo site', () => {
        cy.visit('https://todolist.james.am/#/');
        cy.get('.new-todo').type('do something cool{enter}');
    });
});