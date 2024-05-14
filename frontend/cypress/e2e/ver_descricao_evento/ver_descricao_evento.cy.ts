/// <reference types="cypress" />

describe('Teste Funcional de Login', () => {
    it('Deve realizar login com sucesso', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-test="username"]').type('william@bhzconnection.org.br');
      cy.wait(1000);
      cy.get('[data-test="password"]').type('password123');
      cy.wait(1000);
      cy.get('.MuiButtonBase-root').click();
      cy.wait(1000);
      cy.get('.css-1v45ur3-MuiTypography-root').should('contain', 'Sistema de');
  
      //Navegação na tela
      cy.get(':nth-child(5) > .MuiPaper-root > .MuiCardContent-root').click();
      cy.wait(1000);
      cy.get('.css-ggq0th > :nth-child(2) > .MuiBox-root > :nth-child(1) > .MuiButtonBase-root > .MuiCardMedia-root').click();
      cy.wait(1000);
      cy.get('.MuiTypography-h5').should('contain', 'Descrição do evento');
    });
  });
  