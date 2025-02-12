describe('ToDoTest', () => { 

    it('visit ToDo site', () => {
        cy.visit('https://todolist.james.am/#/');
        cy.get('.new-todo').type('do something cool{enter}');

        cy.get('ul.todo-list li').contains('do something cool').should('be.visible').and('have.text', 'do something cool');
        cy.contains('ul.todo-list li', 'do something cool').find('button.destroy').invoke('show');
        
    });

    it('Delete ToDo taks', () => {
        cy.visit('https://todolist.james.am/#/');
        cy.get('.new-todo').type('do something cooler{enter}');
        cy.get('.new-todo').type('trinama uzduotis{enter}');

        cy.contains('ul.todo-list li', 'trinama uzduotis').find('button.destroy').invoke('show');
        cy.contains('ul.todo-list li', 'trinama uzduotis').find('button.destroy').click();

        

    })
});