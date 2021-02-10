describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3003')
  })

  it('front page can be opened', function() {
    cy.contains('Blog')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('malcomm')
    cy.get('#password').type('Andree98.,')
    cy.get('#login-button').click()
  })
})