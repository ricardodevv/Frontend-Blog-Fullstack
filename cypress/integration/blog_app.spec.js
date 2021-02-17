describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    const user = {
      username: 'jvalentine',
      name: 'jill valentine',
      password: '123456Dc'
    }
    cy.request('POST', 'http://localhost:3002/api/users/', user)
    cy.visit('http://localhost:3002')
  })

  it('front page can be opened', function() {
    cy.contains('Blog')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('jvalentine')
    cy.get('#password').type('123456Dc')
    cy.get('#login-button').click()

    cy.contains('jill valentine logged-in')
  })

  it('failed login', function() {
    cy.contains('login').click()
    cy.get('#username').type('dogemon')
    cy.get('#password').type('woofwoof')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'jill valentine logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jvalentine', password: '123456Dc' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.contains('Add').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'lol op',
          author: 'riotraise',
          content: 'op bard botlane'
        })
      })

      it('it can be made important', function() {
        cy.contains('lol op')
      })

      describe('and several blogs exist', function() {
        beforeEach(function() {
          cy.createBlog({ title: 'one blog' })
          cy.createBlog({ title: 'two blogs' })
          cy.createBlog({ title: 'three blogs' })
        })

        it('giving like in one of them', function() {
          cy.contains('one blog')
            .find('button').contains('Like').as('likeButton')
          cy.get('@likeButton')
            .click()
        })
      })
    })
  })
})
