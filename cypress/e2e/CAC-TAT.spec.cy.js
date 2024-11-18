/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){

    cy.get('#firstName').type('Deivid')
    cy.get('#lastName').type('Jesus')
    cy.get('#email').type('deividmfj2010@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('validar campo de e-mail inválido', function(){

    cy.get('#lastName').type('Jesus')
    cy.get('#email').type('deividmfj2010@hotmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo de telefone deve continuar vazio quando digitado um caractere não numero', function(){
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#lastName').type('Jesus')
    cy.get('#email').type('deividmfj2010@hotmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
      .type('Deivid')
      .should ('have.value', 'Deivid')
      .clear()
      .should('have.value', '')

      cy.get('#lastName')
      .type('Melo')
      .should ('have.value', 'Melo')
      .clear()
      .should('have.value', '')

      cy.get('#email')
      .type('deivid@teste.com')
      .should ('have.value', 'deivid@teste.com')
      .clear()
      .should('have.value', '')

      cy.get('#phone')
      .type('12345678')
      .should ('have.value', '12345678')
      .clear()
      .should('have.value', '')


  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

  })
  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product').select('youtube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })
  
  it('marcar o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]').check()
      .should('have.value', 'feedback')

  })

  it('marca cada tipo de atendimento',function (){
    cy.get('input[type="radio"]')
      .should('have.length',3)
      .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type = "checkbox"]').check()
    .last()
    .uncheck()
    .should('not.be.checked')

  })

  it('marcar um checkbox', function(){
    cy.get('input[type = "checkbox"][value="email"]').check()
    .should('have.value', 'email')

  })

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type = "file"]')
      .should('not.have.value')
      .selectFile('/Users/deividmelo/cypress-basico-v2/cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')

      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type = "file"]')
      .should('not.have.value')
      .selectFile('/Users/deividmelo/cypress-basico-v2/cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')

      })
    })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type = "file"]')
    .selectFile('@sampleFile')
    .should(function($input){
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
      
      })
  })

