class TiendaPagina{
    constructor (){
        this.botonBuscar='.actions';
        this.filtros='#filters-items';
        this.FiltrosSeleccionados = '.selectedfilters';
    }

abrirPagina=() =>{
    cy.viewport(1280,800);
    cy.visit('https://tiendaonline.movistar.com.ar');
    //verificamos que se pueda ingresar a la página indicada
    cy.url().should('include','https://tiendaonline.movistar.com.ar/');
}

Busqueda = () => {
    cy.get(this.botonBuscar).click();
}

Filtrar = (item) =>{
    cy.get(this.filtros).contains(item).click({force: true});
}

VerficarFiltro = (verificar) => {
    cy.get(this.FiltrosSeleccionados).should('contains.text',verificar);
}



}

export default new TiendaPagina()