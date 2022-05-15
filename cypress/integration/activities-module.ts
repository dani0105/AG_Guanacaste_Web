describe('Activities Module', () => {

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



  it('Create Activity', () => {
    cy.intercept('/activities').as('create');
    cy.intercept('/upload').as('uploadImage');

    cy.visit('/dashboard/activities');
    cy.get('#create').click();
    cy.url().should('include', '/dashboard/activities/create');

    cy.get('input[formcontrolname=name]').type("Actividad testing");
    cy.get('mat-select[formcontrolname=id_activity_type]').click().get('mat-option').first().click();
    cy.get('mat-select[formcontrolname=id_difficulty]').click().get('mat-option').first().click();
    cy.get('textarea[formcontrolname=description]').type("Descripción Testing");
    cy.get('mat-select[formcontrolname=id_accessibility]').click().get('mat-option').first().click();
    cy.get('div[contenteditable=true]').type("Actividad turisticas Testing");
    cy.get('input[formcontrolname=direction]').type("Dirección de la actividad Test");

    let x, y;
    cy.get('canvas').then(e => {
      x = e.width() / 2;
      y = e.height() / 2;
      return e;
    }).click(x, y);

    cy.fixture('img02.jpg').then(fileContent => {
      cy.get('input[type=file]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'img02.jpg',
        mimeType: 'image/jpg'
      });
    })
    cy.wait('@uploadImage').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });

    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.wait('@create').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });
  })

  it('Update Activity', () => {
    cy.intercept('/activities/*').as('update');
    cy.intercept('/upload').as('uploadImage');

    cy.visit('/dashboard/activities');
    cy.get('mat-cell.mat-column-actions').find('a').first().click();
    cy.url().should('include', 'update');

    cy.get('input[formcontrolname=name]').clear().type("Actividad testing update");
    cy.get('mat-select[formcontrolname=id_activity_type]').click().get('mat-option').last().click();
    cy.get('mat-select[formcontrolname=id_difficulty]').click().get('mat-option').last().click();
    cy.get('textarea[formcontrolname=description]').clear().type("Descripción Testing Update");
    cy.get('mat-select[formcontrolname=id_accessibility]').click().get('mat-option').last().click();
    cy.get('div[contenteditable=true]').clear().type("Descripción de Actividad turisticas Testing");
    cy.get('input[formcontrolname=direction]').clear().type("Dirección de la actividad");

    let x, y;
    cy.get('canvas').last().then(e => {
      x = e.width() / 2;
      y = e.height() / 2;
      return e;
    }).click(x, y);

    cy.fixture('img03.jpg').then(fileContent => {
      cy.get('input[type=file]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'img03.jpg',
        mimeType: 'image/jpg'
      });
    })
    cy.wait('@uploadImage').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });

    cy.get("button[type=submit]").click();
    cy.wait(1000);
    cy.wait('@update').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });

  })

  it('Delete Activity', () => {
    cy.intercept('/activities/*').as('delete');
    cy.visit('/dashboard/activities');

    cy.get('mat-cell.mat-column-actions').first().find('button').first().click();
    cy.wait(1000);
    cy.get('#accept').click();

    cy.wait('@delete').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });
  })


})