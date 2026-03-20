import tienda from '../support/pageObjects/TiendaPage';
import telefono from '../support/pageObjects/TelefonoPage';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Ejercicio de automatización - Movistar', () => {
    
    beforeEach(() => {
        tienda.abrirPagina();
    }); 
    afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
});

    it('CP001 - Validar cuotas en compra de equipo -Al menos 3 cuotas -Equipo.A16', () => {
        tienda.Busqueda();
        cy.get('.field.search').type('A16');
        tienda.Busqueda();
        cy.get('.product-link').click();

        //verificamos que el equipo seleccionado sea el A16
        cy.get(':nth-child(1) > .page-title').should('contain.text','Galaxy A16');

        //al menos 3 cuotas sin interes
        cy.get('.price-content > :nth-child(5)').should('be.visible','Hasta 6 cuotas sin interés');
        
        cy.screenshot('CP001-Al-Menos-3-Cuotas-Sin-Interés');
    });

    it('CP002 - Aplicar filtro de equipos  -Memoria Interna.256GB -Precio Entre 1200K y Superior',()=>{
        
        tienda.Filtrar('Memoria interna');
        tienda.Filtrar('256GB');
        tienda.Filtrar ('Precio');
        tienda.Filtrar('$ 1.500.000 - $ 3.399.999');
        
        //verificamos que sean los filtros seleccionados
        tienda.VerficarFiltro('256GB');
        tienda.VerficarFiltro('1.500.000');

        //verificamos que haya al menos 1 equipo y mostramos cuantos hay
        cy.get('.total-products > p').should('have.length.greaterThan', 0);
        cy.get('.total-products > p').should('contain.text','7');
    
        cy.screenshot('CP002-Filtros-Aplicados-7-Resultados');

    })

   it('CP003 - Validar cuotas en compra de equipo - No mas de 12 cuotas en todos los medios de pago', () => {
        
        cy.get('.product-item').eq(2).click();
        
        telefono.verMediosDePago();

        cy.fixture('Bancos').then((listaBancos) => {
            
            listaBancos.forEach((unBanco) => {

                cy.get('#banksArrow').click();
                cy.get('.card-selector._collapse').contains(unBanco.entidad).click({force: true});

                cy.get('#cardsArrow').click({force: true});
                cy.get('#cardSelector').contains(unBanco.tarjeta).click({force: true});

                // Verificamos que NO existan cuotas mayores a 12
                cy.get('#installments-modal').should('not.contain', '18 cuotas');
                cy.get('#installments-modal').should('not.contain', '24 cuotas'); 

            });

            cy.get('.installments-modal > .modal-inner-wrap > .modal-header > .action-close').click();
    
          
        });
    });
    
    it('CP004 - Filtrar por Galaxy IA- Menor a mayor precio. Abrir el tercero y validar que sea el prelanzamiento y tenga retiro en el local', () => {
        
    tienda.Filtrar('Inteligencia Artificial');
    tienda.Filtrar('Galaxy AI');

    cy.get('#sortQL').select('Precio - Menor a Mayor');
    cy.get('.product-item').eq(2).click();

    //validamos prelanzamiento
    cy.get('.featured-tag').should('contain.text','Prelanzamiento');

    //validamos retiro en el local
    cy.get('.text-container').should('contain.text','Retiro en local');

    cy.screenshot('CP004-Prelanzamiento-Retiro en local');
        
    });

});

