const user = {
  name: 'Clark Kent',
  username: 'ckent',
  password: 'superman',
};

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.get("[data-cy='username-input']");
    cy.get("[data-cy='password-input']");
    cy.get("[data-cy='login-button']");
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get("[data-cy='username-input']").type(user.username);
      cy.get("[data-cy='password-input']").type(user.password);
      cy.get("[data-cy='login-button']").click();
      cy.contains(`${user.name} logged in`);
      cy.get("[data-cy='logout-button']");
    });

    it('fails with wrong credentials', () => {
      cy.get("[data-cy='username-input']").as('usernameInput').type(user.username);
      cy.get("[data-cy='password-input']").as('passwordInput').type('wrong');
      cy.get("[data-cy='login-button']").click();
      cy.get('@usernameInput');
      cy.get('@passwordInput');
      cy.get("[data-cy='notification']").should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
