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
    cy.intercept('/touristic-areas').as('createTouristicArea');
    cy.intercept('/upload').as('uploadImage');

    cy.visit('/dashboard/touristic-areas');
    cy.get('#create').click();
    cy.url().should('include', '/dashboard/touristic-areas/create');

    cy.get('input[formcontrolname=name]').type("Area Turistica Testing");
    cy.get('mat-select[formcontrolname=id_type_tourist_area]').click().get('mat-option').first().click();

    cy.get('div[contenteditable=true]').type("Descripción de prueba del area Turistica");

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
    cy.wait('@createTouristicArea').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });


  })

  it('Update Touristic Area', () => {
    cy.intercept('/touristic-areas/*').as('updateTouristicArea');
    cy.intercept('/upload').as('uploadImage');

    cy.visit('/dashboard/touristic-areas');
    cy.get('td.mat-column-actions').find('a').first().click();
    cy.url().should('include', 'update');

    cy.get('input[formcontrolname=name]').clear().type("Area Turistica Testing Update");
    cy.get('mat-select[formcontrolname=id_type_tourist_area]').click().get('mat-option').last().click();

    cy.get('div[contenteditable=true]').clear().type("Descripción de prueba del area Turistica Update");

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
    cy.wait('@updateTouristicArea').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });

  })

  it('Filter Touristic Area', () => {

    let filter = "Area Turi"

    cy.intercept({
      pathname: '/touristic-areas',
      query: {
        page: '0',
        size: '25',
        filter: filter
      },
    }).as('get');
    cy.visit('/dashboard/touristic-areas');

    cy.get('#filter').clear().type('Area Turi').type('{enter}');
    cy.wait('@get').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });

  })

  it('Delete Touristic Area', () => {
    cy.intercept('/touristic-areas/*').as('delete');
    cy.visit('/dashboard/touristic-areas');

    cy.get('td.mat-column-actions').first().find('button').first().click();

    cy.wait('@delete').then((interception) => {
      expect(interception.response.statusCode).eql(200);
    });

  })



})