const user = {
  name: 'Clark Kent',
  username: 'ckent',
  password: 'superman',
};

const blog = {
  title: 'NBA',
  author: 'Lebron James',
  url: 'https://nba.com',
};

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user);
    cy.visit('');
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

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: user.username, password: user.password });
    });

    it('A blog can be created', () => {
      cy.get('[data-cy=create-blog-button] [data-cy="toggle-display-button"]').click();
      cy.get('[data-cy=title-input]').as('titleInput').type(blog.title);
      cy.get('[data-cy=author-input]').as('authorInput').type(blog.author);
      cy.get('[data-cy=url-input]').as('urlInput').type(blog.url);
      cy.get('[data-cy=send-button]').click();
      cy.get("[data-cy='notification']").should('have.css', 'color', 'rgb(0, 128, 0)');
      cy.get('@titleInput').should('not.be.visible');
      cy.get('@authorInput').should('not.be.visible');
      cy.get('@urlInput').should('not.be.visible');
      cy.get('[data-cy=blog-summary]').contains(`${blog.title} ${blog.author}`);
    });
  });
});
