/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

interface Chainable {
  getMockIngredients(): void;
}

Cypress.Commands.add('getMockIngredients', () => {
  cy.intercept('GET', 'api/ingredients', {
    statusCode: 200,
    fixture: 'ingredients.json'
  }).as('getIngredientsApi');
});

Cypress.Commands.add('mockUserLogin', () => {
  cy.intercept('POST', 'api/auth/login', {
    statusCode: 200,
    fixture: 'user.json'
  }).as('api/login');
});

Cypress.Commands.add('mockOrderData', () => {
  cy.intercept('POST', 'api/orders', {
    statusCode: 200,
    fixture: 'order.json'
  }).as('api/orders');
});
