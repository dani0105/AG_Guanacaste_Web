describe('users Module', () => {

  // login en la aplicación
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('/auth/login').as('login');

    cy.get('input[type=email]').type("admin@email.com");
    cy.get('input[type=password]').type("password");
    cy.get('button[type=submit]').should('not.be.disabled').click();
    cy.wait('@login').then((interception) => {
      expect(interception.response.statusCode).eql(200);
      cy.url().should('include', '/dashboard/users').end();
    })
  });

  it('Create User', () => {
    cy.intercept('/users').as('createUser');

    cy.visit('/dashboard/users');
    let date = new Date();
    let email = `${date.getTime()}@random.com`;
    cy.get('#create').click();
    cy.wait(400);
    cy.get('input[formcontrolname=name]').type("testing");
    cy.get('input[formcontrolname=email]').type(email);
    cy.get('input[formcontrolname=password]').type("password");
    cy.get('mat-select[formcontrolname=id_rol]').click().get('mat-option').contains('User').click();
    cy.get('button[type=submit]').should('not.be.disabled').click();

    cy.wait('@createUser').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });
  })

  it('Update User', () => {
    cy.intercept('/users/*').as('updateUser');

    cy.visit('/dashboard/users');
    cy.get('td.mat-column-actions').find('button').first().click();
    let date = new Date();
    let email = `${date.getTime()}@random.com`;
    cy.wait(400);
    cy.get('input[formcontrolname=name]').clear().type("testingUpdate");
    cy.get('input[formcontrolname=email]').clear().type(email);
    cy.get('input[formcontrolname=password]').clear().type("password2");
    cy.get('mat-select[formcontrolname=id_rol]').click().get('mat-option').contains('Admin').click();

    cy.get('button[type=submit]').should('not.be.disabled').click();

    cy.wait('@updateUser').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });

  })

  it('Delete User', () => {
    cy.intercept('/users/*').as('deleteUser');

    cy.visit('/dashboard/users');
    cy.get('td.mat-column-actions').first().find('button').last().click();

    cy.wait('@deleteUser').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });
  })
})
