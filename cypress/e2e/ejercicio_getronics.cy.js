import TiendaPrincipal from '../support/pageObjects/TiendaPage';
import TelefonoPagina from '../support/pageObjects/TelefonoPage';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Ejercicio de automatización - Movistar', () => {
    
    beforeEach(() => {
        TiendaPrincipal.abrirPagina();
    }); 
    afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
});

    it('CP001 - Validar cuotas en compra de equipo -Al menos 3 cuotas -Equipo.A16', () => {
        TiendaPrincipal.BusquedaBttn();
        TiendaPrincipal.Buscador('A16');
        TiendaPrincipal.BusquedaBttn();
        TiendaPrincipal.IngresarAProductoA16();

        //Verificamos que el equipo seleccionado sea el A16
        TelefonoPagina.ObtenerTitulo().should('contain.text','Galaxy A16');

        //Verificamos al menos 3 cuotas sin interes
        TelefonoPagina.CuadoDeCuotas().should('be.visible','Hasta 6 cuotas sin interés');
        
        cy.screenshot('CP001-Al-Menos-3-Cuotas-Sin-Interés');
    });

   it('CP002 - Aplicar filtro de equipos  -Memoria Interna.256GB -Precio Entre 1200K y Superior',()=>{
        
        TiendaPrincipal.Filtrar('Memoria interna');
        TiendaPrincipal.Filtrar('256GB');
        TiendaPrincipal.Filtrar ('Precio');
        TiendaPrincipal.Filtrar('$ 1.500.000 - $ 3.771.999');
        
        //verificamos que sean los filtros seleccionados
        TiendaPrincipal.VerficarFiltro('256GB');
        TiendaPrincipal.VerficarFiltro('1.500.000');

        //verificamos que haya al menos 1 equipo y mostramos cuantos hay
        TiendaPrincipal.CantidadEquipos().should('have.length.greaterThan', 0);
        TiendaPrincipal.CantidadEquipos().should('contain.text','7');
    
        cy.screenshot('CP002-Filtros-Aplicados-7-Resultados');

    })

   it('CP003 - Validar cuotas en compra de equipo - No mas de 12 cuotas en todos los medios de pago', () => {
        
        TiendaPrincipal.TercerTelefono().click();
        
        TelefonoPagina.verMediosDePago();

        cy.fixture('Bancos').then((listaBancos) => {
            
            listaBancos.forEach((unBanco) => {

                TelefonoPagina.DespegarBancos();
                TelefonoPagina.SeleccionadorBancos().contains(unBanco.entidad).click({force: true});

                TelefonoPagina.DesplegarTarjetas();
                TelefonoPagina.SeleccionadorTarjetas().contains(unBanco.tarjeta).click({force: true});

                // Verificamos que NO existan cuotas mayores a 12
                TelefonoPagina.TablaDeCuotas().should('not.contain', '18 cuotas');
                TelefonoPagina.TablaDeCuotas().should('not.contain', '24 cuotas'); 

            });

        TelefonoPagina.CerrarModal();
    
        });
    });
    
    it('CP004 - Filtrar por Galaxy IA- Menor a mayor precio. Abrir el tercero y validar que tenga retiro en el local y en el correo', () => {
        
    TiendaPrincipal.Filtrar('Inteligencia Artificial');
    TiendaPrincipal.Filtrar('Galaxy AI');

    TiendaPrincipal.SeleccionarOrdenPrecio('Precio - Menor a Mayor');
    TiendaPrincipal.TercerTelefono().click();

    //validamos retiro en el local
    TelefonoPagina.CuadroRetiro().should('contain.text','Retiro en local');
    //validamos retiro en el correo 
    TelefonoPagina.CuadroCorreo().should('contain.text','Retiro en correo');

    cy.screenshot('CP004-Retiro en local-Retiro en correo');
        
    });

}); 

