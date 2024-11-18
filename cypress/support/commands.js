Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Deivid')
    cy.get('#lastName').type('Jesus')
    cy.get('#email').type('deividmfj2010@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})