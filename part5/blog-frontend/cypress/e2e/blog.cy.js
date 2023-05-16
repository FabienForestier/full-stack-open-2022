describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Clark Kent',
      username: 'ckent',
      password: 'superman',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.get("[data-cy='username-input']");
    cy.get("[data-cy='password-input']");
    cy.get("[data-cy='login-button']");
  });
});
