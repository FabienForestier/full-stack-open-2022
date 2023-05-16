Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password,
  }).then(({ body }) => {
    localStorage.setItem('blogAppUser', JSON.stringify(body));
    cy.visit('');
  });
});
