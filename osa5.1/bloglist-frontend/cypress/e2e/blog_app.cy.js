describe('Blog app', function(){
  beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.createUser({name: 'Cypress Tester', username: 'cypressBot', password: 'password'})
      cy.createUser({name: 'Cypress Tester2', username: 'cypressBot2', password:'password2'})

     cy.visit('http://localhost:3001')

  })

  it('Login form is shown', function() {
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
      cy.login({ username: 'cypressBot' ,password: 'password' })

      cy.createBlog({ title: 'a test blog',author: 'test author', url: 'www.testurl.fi'})
      cy.createBlog({ title: 'a second test blog',author: 'test author', url: 'www.testurl.fi'})
      cy.createBlog({ title: 'a third test blog',author: 'test author', url: 'www.testurl.fi'})

    })

  it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('https://www.cypress.io')
      cy.get('#create-button').click()
     })

  it('A blog can be liked', function() {
      cy.contains('View').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

  it('Blog creator can remove blog', function() {
    
      cy.get('#view-button').click()
      cy.contains('remove').click()

      cy.on('window:confirm', (text) => {
          expect(text).to.contain('Do you really want to remove a test blog blog?')
        })

      cy.visit('http://localhost:3001')

      cy.get('.blog').should('have.length', 2)

     })

    it('The remove button is not shown to another user', function() {
    cy.clearLocalStorage()
    cy.login({ username: 'cypressBot2' ,password: 'password2' })

        cy.get('#view-button').click()
        cy.contains('remove').should('not.exist')
     })

  })
})
