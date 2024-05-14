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
  
      // Navegação na tela
      cy.get(':nth-child(4) > .MuiPaper-root > .MuiCardContent-root').click();
      cy.wait(1000);
      cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1) > :nth-child(1)').click();
      cy.wait(1000);
      cy.get('input#\\:r1\\:').clear().type('Manoel Ferreira');
      cy.wait(1000);
      cy.get('[data-test="date"]').clear().type('2023-05-01');
      cy.wait(1000);
      cy.get('[data-test="address"]').clear().type('Rua 1234');
      cy.wait(1000);
      cy.get('[data-test="name_tutor"]').clear().type('João Gomez');
      cy.wait(1000);
      cy.get('[data-test="phone_tutor"]').clear().type('11 33334444');
      cy.wait(1000);
      cy.get('div.MuiBackdrop-root.MuiBackdrop-invisible.MuiModal-backdrop.css-g3hgs1-MuiBackdrop-root-MuiModal-backdrop').should('not.exist');
      cy.wait(1000);
      cy.get('.css-1vg26sl > .MuiButtonBase-root').click();
      cy.wait(1000);
      cy.scrollTo("bottom"); 
      cy.get('.css-1v45ur3-MuiTypography-root').should('contain', 'Sistema de');
    });
  });
  