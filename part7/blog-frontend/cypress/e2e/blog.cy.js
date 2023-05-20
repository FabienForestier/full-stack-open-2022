const user = {
  name: 'Clark Kent',
  username: 'ckent',
  password: 'superman'
};

const NBABlog = {
  title: 'NBA',
  author: 'Lebron James',
  url: 'https://nba.com',
  likes: 0
};

const DCBlog = {
  title: 'DC',
  author: 'Ken Block',
  url: 'https://dc.com',
  likes: 5
};

const MarvelBlog = {
  title: 'Marvel',
  author: 'Martin Goodman',
  url: 'https://marvel.com',
  likes: 4
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
      cy.get('[data-cy=title-input]').as('titleInput').type(NBABlog.title);
      cy.get('[data-cy=author-input]').as('authorInput').type(NBABlog.author);
      cy.get('[data-cy=url-input]').as('urlInput').type(NBABlog.url);
      cy.get('[data-cy=send-button]').click();
      cy.get("[data-cy='notification']").should('have.css', 'color', 'rgb(0, 128, 0)');
      cy.get('@titleInput').should('not.be.visible');
      cy.get('@authorInput').should('not.be.visible');
      cy.get('@urlInput').should('not.be.visible');
      cy.get('[data-cy=blog-summary]').contains(`${NBABlog.title} ${NBABlog.author}`);
    });

    describe('When a blog has been created', () => {
      beforeEach(() => {
        cy.createBlog({ blog: NBABlog });
      });
      it('it can be liked', () => {
        cy.get('[data-cy=blog-summary]')
          .contains(NBABlog.title)
          .find('[data-cy=view-details-button]')
          .click();
        cy.get('[data-cy=blog-summary-details]')
          .contains(NBABlog.title)
          .parent()
          .as('blogDetails')
          .find('[data-cy=blog-number-of-likes]')
          .as('numberOfLikes')
          .should('have.text', 0);
        cy.get('@blogDetails').find('[data-cy=like-button]').click();
        cy.get('@numberOfLikes').should('have.text', 1);
      });

      it('Can be deleted by the user that created it', () => {
        cy.get('[data-cy=blog-summary]')
          .contains(NBABlog.title)
          .find('[data-cy=view-details-button]')
          .click();
        cy.get('[data-cy=blog-summary-details]')
          .contains(NBABlog.title)
          .parent()
          .find('[data-cy=delete-button]')
          .click();
        cy.get('[data-cy=blog-summary]').should('not.exist');
      });

      it('Cannot be deleted by a user that is not the owner', () => {
        const lois = {
          name: 'Lois',
          username: 'lois',
          password: 'girlfriend'
        };
        const cryptoBlog = {
          title: 'Crypto',
          author: 'lex',
          url: 'https://crypto.com'
        };
        cy.request('POST', `${Cypress.env('BACKEND')}/users/`, lois);
        cy.login({ username: lois.username, password: lois.password });
        cy.createBlog({
          blog: cryptoBlog
        });
        cy.visit('');
        cy.login({ username: user.username, password: user.password });
        cy.get('[data-cy=blog-summary]')
          .contains(cryptoBlog.title)
          .find('[data-cy=view-details-button]')
          .click();
        cy.get('[data-cy=blog-summary-details]')
          .contains(cryptoBlog.title)
          .parent()
          .find('[data-cy=delete-button]')
          .should('not.exist');
      });
    });

    describe('When many blogs have been created', () => {
      beforeEach(() => {
        cy.createBlog({ blog: NBABlog });
        cy.createBlog({ blog: DCBlog });
        cy.createBlog({ blog: MarvelBlog });
      });

      it.only('should order list by most likes', () => {
        cy.get('[data-cy=blog-summary]').eq(0).should('contain', DCBlog.title);
        cy.get('[data-cy=blog-summary]').eq(1).should('contain', MarvelBlog.title);
        cy.get('[data-cy=blog-summary]').eq(2).should('contain', NBABlog.title);
        cy.get('[data-cy=blog-summary]')
          .contains(MarvelBlog.title)
          .find('[data-cy=view-details-button]')
          .click();
        cy.get('[data-cy=blog-summary-details]')
          .contains(MarvelBlog.title)
          .parent()
          .as('blogDetails')
          .find('[data-cy=blog-number-of-likes]')
          .as('numberOfLikes');
        cy.get('@blogDetails').find('[data-cy=like-button]').as('likeButton').click();
        cy.get('@numberOfLikes').should('have.text', MarvelBlog.likes + 1);
        cy.get('@likeButton').click();
        cy.get('@numberOfLikes').should('have.text', MarvelBlog.likes + 2);
        cy.get('[data-cy=blog-summary-details]')
          .contains(MarvelBlog.title)
          .find('[data-cy=hide-details-button]')
          .click();
        cy.get('[data-cy=blog-summary]').eq(0).should('contain', MarvelBlog.title);
        cy.get('[data-cy=blog-summary]').eq(1).should('contain', DCBlog.title);
        cy.get('[data-cy=blog-summary]').eq(2).should('contain', NBABlog.title);
      });
    });
  });
});
