/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
  const  THREE_SECONDS_IN_MS = 3000
  beforeEach(function(){
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', function(){

    cy.clock()

    cy.get('#firstName').type('Deivid')
    cy.get('#lastName').type('Jesus')
    cy.get('#email').type('deividmfj2010@hotmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.success').should('not.be.visible')

  })
  Cypress._.times(3, function(){

  it('validar campo de e-mail inválido', function(){

    cy.get('#lastName').type('Jesus')
    cy.get('#email').type('deividmfj2010@hotmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  })
  it('campo de telefone deve continuar vazio quando digitado um caractere não numero', function(){
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.clock()

    cy.get('#lastName').type('Jesus')
    cy.get('#email').type('deividmfj2010@hotmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('.error').should('not.be.visible')

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
  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', function(){
    const longText = Cypress._.repeat('0123456789',20)

    cy.get('#open-text-area')
      .invoke('val',longText)
      .should('have.value', longText)


  })

  it('faz uma requisicao HTTP', function(){
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    .should(function(response){
      const { status, statusText, body} = response
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')

    })

  })

  it.only('encontra o gato', function(){
    cy.get('#cat')
    .invoke('show')
    .should('be.visible')
    cy.get('#title')
    .invoke('text', 'CAT TAT')

  })
})

