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
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiButtonBase-root > .MuiCardMedia-root').click();
        cy.wait(1000);
        cy.get('input#\\:r0\\:').type('Tecnologia BLA');
        cy.wait(1000);
        cy.get('[data-test="date"]').type('2023-05-01');
        cy.wait(1000);
        cy.get('[data-test="description_event"]').type('bla bla bla');
        cy.wait(1000);
        cy.get('.css-xi606m > .MuiButtonBase-root').click();
        cy.wait(1000);
        cy.scrollTo(0, 1000);
        cy.get(':nth-child(2) > .MuiTypography-h4').should('contain', 'Próximos eventos');
    });
  });
  