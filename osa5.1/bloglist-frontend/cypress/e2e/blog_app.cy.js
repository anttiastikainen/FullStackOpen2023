describe('Blog app', function(){
  beforeEach(function() {
      cy.request('GET', 'http://localhost:3003/api/users')
      const user = {
          name: 'Antti Astikainen',
          username: 'AnttiA',
          password: 'salasana'
      }
      //cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.request('GET', 'http://localhost:3003/api/users')
      cy.visit('http://localhost:3001')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3001')
    cy.contains('Log in to application')
  })

  it('login form can be opened', function() {
      cy.contains('log in').click()
  })

  it('user can login', function() {
      cy.contains('log in').click()
      cy.get('#username').type('AnttiA')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Antti Astikainen logged in')
  })

describe('when logged in', function() {
    beforeEach(function() {
        cy.contains('log in').click()
        cy.get('#username').type('AnttiA')
        cy.get('#password').type('salasana')
        cy.get('#login-button').click()
    })

  it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('https://www.cypress.io')
      cy.get('#create-button').click()
     })
  })
})
