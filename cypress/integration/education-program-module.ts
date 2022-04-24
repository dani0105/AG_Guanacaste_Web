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



  it('Create Touristic Area', () => {
    cy.intercept('/education-programs').as('create');
    cy.intercept('/upload').as('uploadImage');

    cy.visit('/dashboard/education-programs');
    cy.get('#create').click();
    cy.url().should('include', '/dashboard/education-programs/create');

    cy.get('input[formcontrolname=name]').type("programa testing");
    cy.get('mat-select[formcontrolname=id_education_program_type]').click().get('mat-option').first().click();
    cy.get('textarea[formcontrolname=description]').type("Descripción Testing");
    cy.get('textarea[formcontrolname=goal]').type(" Meta del prgrama Testing");
    cy.get('input[formcontrolname=inscription_link]').type("https://www.google.com/");
    cy.get('div[contenteditable=true]').type("Requisitos del programa");
    cy.get('input[formcontrolname=direction]').type("Dirección de la programa Test");

    let x, y;
    cy.get('canvas').then(e => {
      x = e.width() / 2;
      y = e.height() / 2;
      return e;
    }).click(x, y);

    cy.fixture('img01.jpg').then(fileContent => {
      cy.get('input[type=file]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'testPicture.jpg',
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

  it('Update Touristic Area', () => {
    cy.intercept('/education-programs/*').as('update');
    cy.intercept('/upload').as('uploadImage');

    cy.visit('/dashboard/education-programs');
    cy.get('td.mat-column-actions').find('a').first().click();
    cy.url().should('include', 'update');

    cy.get('input[formcontrolname=name]').clear().type("programa testing update");
    cy.get('mat-select[formcontrolname=id_education_program_type]').click().get('mat-option').last().click();
    cy.get('textarea[formcontrolname=description]').clear().type("Descripción Testing update");
    cy.get('textarea[formcontrolname=goal]').clear().type(" Meta del prgrama Testing update");
    cy.get('input[formcontrolname=inscription_link]').clear().type("https://www.google.com/testing-update");
    cy.get('div[contenteditable=true]').clear().type("Requisitos del programa update");
    cy.get('input[formcontrolname=direction]').clear().type("Dirección de la programa Test update");

    let x, y;
    cy.get('canvas').last().then(e => {
      x = e.width() / 3;
      y = e.height() / 3;
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
    cy.wait('@update').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });

  })

  it('Delete Touristic Area', () => {
    cy.intercept('/education-programs/*').as('delete');
    cy.visit('/dashboard/education-programs');

    cy.get('td.mat-column-actions').first().find('button').first().click();

    cy.wait('@delete').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });

  })

})