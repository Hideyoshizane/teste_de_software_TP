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
        cy.wait(1000);
        // Navegação na tela
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root').click();
        cy.wait(1000);
        cy.get('[data-test="name_aluno"]').type('Jupira Silva');
        cy.wait(1000);
        cy.get('[data-test="date"]').type('2023-05-01');
        cy.wait(1000);
        cy.get('[data-test="address"]').type('Rua 1234');
        cy.wait(1000);
        cy.get('[data-test="name_tutor"]').type('João Gomez');
        
        // Esperar 1 segundo
        cy.wait(1000);
        
        cy.get('[data-test="phone_tutor"]').type('11 33334444');
        cy.wait(1000);
        cy.get('div.MuiBackdrop-root.MuiBackdrop-invisible.MuiModal-backdrop.css-g3hgs1-MuiBackdrop-root-MuiModal-backdrop').should('not.exist');
        cy.wait(1000);
        cy.get('button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.css-1nmkmc-MuiButtonBase-root-MuiButton-root').click();
        cy.wait(1000);
        cy.scrollTo(0, 500);
        cy.get(':nth-child(4) > .MuiPaper-root > .MuiCardContent-root').click();
        cy.wait(1000);
        cy.get('input#\\:r0\\:').type('Jupira Silva');
        cy.get('.css-1v45ur3-MuiTypography-root').should('contain', 'Sistema de');
    });
  });
  