describe('Tic Tac Toe', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Board should be empty and X should start', () => {
    cy.get('[data-testid="status"]').should('have.text', 'Next player: X');
    cy.get('.square').should('have.length', 9);
    cy.get('.square').each($square => {
      cy.wrap($square).should('be.empty');
    });
  });

  it('Players order should alternate', () => {
    cy.get('[data-testid="square-0"]').click();
    cy.get('[data-testid="square-0"]').should('have.text', 'X');
    cy.get('[data-testid="status"]').should('have.text', 'Next player: O');

    cy.get('[data-testid="square-7"]').click();
    cy.get('[data-testid="square-7"]').should('have.text', 'O');
    cy.get('[data-testid="status"]').should('have.text', 'Next player: X');

  });

  it('Win condition check', () => {
    cy.get('[data-testid="square-0"]').click(); //X
    cy.get('[data-testid="square-1"]').click();
    cy.get('[data-testid="square-3"]').click(); //X
    cy.get('[data-testid="square-4"]').click();
    cy.get('[data-testid="square-6"]').click(); //X
 
    cy.get('[data-testid="status"]').should('contain', 'Winner: X');
   
  });

  it('Reset button', () => {
    cy.get('[data-testid="reset-button"]').click();

    cy.get('[data-testid="status"]').should('have.text', 'Next player: X');
    cy.get('.square').should('have.length', 9);
    cy.get('.square').each($square => {
      cy.wrap($square).should('be.empty');
    });
  });

});