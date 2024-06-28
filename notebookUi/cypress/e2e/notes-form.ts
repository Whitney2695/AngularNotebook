describe('Notes Form', () => {
    beforeEach(() => {
      cy.visit('/notes-form'); // Adjust the path if necessary to visit the notes form page
    });
  
    it('should display the form elements', () => {
      cy.get('.input-form').should('exist');
      cy.get('input[formControlName="title"]').should('exist');
      cy.get('input[formControlName="note"]').should('exist');
      cy.get('.input-form button[type="submit"]').should('exist').and('contain', 'ADD');
    });
  
    it('should show error messages for empty fields', () => {
      cy.get('.input-form button[type="submit"]').click();
      cy.get('.error-message').should('contain', 'Title cannot be empty');
      cy.get('.error-message').should('contain', 'Content cannot be empty');
    });
  
    it('should submit the form when valid', () => {
      cy.get('input[formControlName="title"]').type('Sample Title');
      cy.get('input[formControlName="note"]').type('Sample Note');
      cy.get('.input-form button[type="submit"]').click();
  
      // Check if form submission is handled
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Form Submitted');
      });
    });
  
    it('should display the correct styles', () => {
      cy.get('input[formControlName="title"]').should('have.css', 'background-color', 'rgb(255, 193, 248)');
      cy.get('input[formControlName="note"]').should('have.css', 'background-color', 'rgb(255, 193, 248)');
      cy.get('.input-form button[type="submit"]').should('have.css', 'background-color', 'rgb(255, 110, 196)');
    });
  
    it('should change button style on hover', () => {
      cy.get('.input-form button[type="submit"]').trigger('mouseover');
      cy.get('.input-form button[type="submit"]').should('have.css', 'background-color', 'rgb(204, 204, 204)');
      cy.get('.input-form button[type="submit"]').should('have.css', 'background', 'linear-gradient(135deg, rgb(255, 110, 196), rgb(164, 78, 255), rgb(74, 142, 255))');
    });
  });
  