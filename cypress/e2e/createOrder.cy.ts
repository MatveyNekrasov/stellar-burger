describe('create order', function () {
  this.beforeEach(() => {
    cy.getMockIngredients();
    cy.visit('http://localhost:4000/login');
    cy.mockUserLogin();
    cy.get('[data-cy="email-input"]').type('test123@test.ru');
    cy.get('[data-cy="password-input"]').type('testpassword123');
    cy.get('[data-cy="login-button"]').click();
  });

  this.afterAll(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });

  it('should login successfully', () => {
    cy.wait('@api/login').its('request.body').should('deep.equal', {
      email: 'test123@test.ru',
      password: 'testpassword123'
    });

    cy.fixture('user.json').then((user) => {
      cy.getCookie('accessToken')
        .should('exist')
        .should('have.property', 'value', user.accessToken);

      cy.window().then((win) => {
        expect(win.localStorage).to.have.property('refreshToken');
        expect(win.localStorage.getItem('refreshToken')).to.equal(
          user.refreshToken
        );
      });
    });
  });

  it('should adds ingredients to constructor and create order', () => {
    cy.get('[data-cy="top-bun"]').as('topBun');
    cy.get('[data-cy="bottom-bun"]').as('bottomBun');
    cy.get('[data-cy="ingredients-list"]').as('ingredientsList');

    cy.fixture('ingredients.json').then((ingredients) => {
      for (let i = 0; i < 3; i++) {
        cy.get(`[data-cy="ingredient-${ingredients.data[i]._id}"]`)
          .find('[type="button"]')
          .click();
      }

      cy.get('@topBun').should('contain', ingredients.data[0].name);
      cy.get('@bottomBun').should('contain', ingredients.data[0].name);

      for (let i = 1; i < 3; ++i) {
        cy.get('@ingredientsList').should('contain', ingredients.data[i].name);
      }
    });

    cy.mockOrderData();
    cy.get('[data-cy="order-button__container"]')
      .find('[type="button"]')
      .click();

    cy.fixture('order.json').then((orderData) => {
      cy.get('[data-cy="modal"]')
        .should('be.visible')
        .should('contain', orderData.order.number);
    });

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@topBun').should('contain', 'Выберите булки');
    cy.get('@bottomBun').should('contain', 'Выберите булки');
    cy.get('@ingredientsList').should('contain', 'Выберите начинку');
  });
});
