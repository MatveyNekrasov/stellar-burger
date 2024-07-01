describe('modal', function () {
  this.beforeEach(() => {
    cy.getMockIngredients();
    cy.visit('http://localhost:4000');
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.get(`[data-cy="ingredient-link-${ingredients.data[0]._id}"]`).click({
        force: true
      });
    });
  });

  it('should open', () => {
    cy.get('[data-cy="modal"]').should('be.visible');
  });

  it('should close by close button', () => {
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('should close by overlay click', () => {
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('should display correct ingredient', () => {
    cy.fixture('ingredients.json').then((ingredients) => {
      cy.get('[data-cy="ingredient-title"]').should(
        'contain',
        ingredients.data[0].name
      );
    });
  });
});
