describe('Blog app', function(){
  beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
          name: 'Cypress Tester',
          username: 'cypressBot',
          password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3001')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3001')
    cy.contains('Log in to application')
  })

  describe('Login', function() {
      
  it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('cypressBot')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Cypress Tester logged in')
    })

  it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('cypressBot')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      
      cy.get('.error')
          .should('contain','wrong username or password')
         .should('have.css', 'color', 'rgb(255, 0, 0)')
          .should('have.css', 'border-style', 'solid')
         
      cy.get('html').should('not.contain', 'Cypress Tester logged in')
    })

  })

describe('when logged in', function() {
    beforeEach(function() {
        cy.contains('log in').click()
        cy.get('#username').type('cypressBot')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
    })

  it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('https://www.cypress.io')
      cy.get('#create-button').click()
     })
  })
})
