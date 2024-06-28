// cypress/e2e/landing.cy.ts

describe('Welcome Page', () => {
  beforeEach(() => {
    cy.visit('/'); // Adjust the path if necessary to visit the welcome page
  });

  it('should display the welcome message', () => {
    cy.get('#welcome h1').should('contain', 'Welcome to the Notes App!');
  });

  it('should display the welcome paragraph', () => {
    cy.get('#welcome p').should('contain', 'Start taking notes and stay organized.');
  });

  it('should display the "Go to Notes" button', () => {
    cy.get('#notesButton').should('be.visible').and('contain', 'Go to Notes');
  });

  it('should have proper styling for the button', () => {
    cy.get('#notesButton').should('have.css', 'background-color', 'rgb(255, 110, 196)');
    cy.get('#notesButton').should('have.css', 'color', 'rgb(242, 242, 242)');
  });

  it('should change button style on hover', () => {
    cy.get('#notesButton').trigger('mouseover');
    cy.get('#notesButton').should('have.css', 'background-color', 'rgb(242, 242, 242)');
    cy.get('#notesButton').should('have.css', 'color', 'rgb(0, 0, 0)');
  });
});
