import { assert } from "chai";

describe('Auth Module', () => {
  
  it('Administrator login', () => {
    cy.visit('/');
    cy.intercept('/auth/login').as('login');

    cy.get('input[type=email]').type("admin@email.com");
    cy.get('input[type=password]').type("password");
    cy.get('button[type=submit]').should('not.be.disabled').click();
    cy.wait('@login').then((interception) => {
      expect(interception.response.statusCode).eql(200);
      cy.url().should('include', '/dashboard/users').end();
    })
    
  })
})
