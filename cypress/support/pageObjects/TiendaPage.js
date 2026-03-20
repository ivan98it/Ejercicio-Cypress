class TiendaPagina{
    constructor (){
        this.botonBuscar='.actions';
        this.buscador = '.field.search';
        this.productoA16 ='[data-ga-product-comercial_name="Samsung Galaxy A16 4G 128GB"] > .product-link > .product-item-info';
        this.filtros='#filters-items';
        this.FiltrosSeleccionados = '.selectedfilters';
        this.Resultados = '.total-products > p';
        this.ListadoDeTelefonos = '.product-item';
        this.SelectorOrden='#sortQL';
        
    }

    abrirPagina=() =>{
        cy.viewport(1280,800);
        cy.visit('https://tiendaonline.movistar.com.ar');
        //verificamos que se pueda ingresar a la página indicada
        cy.url().should('include','https://tiendaonline.movistar.com.ar/');
    }

    BusquedaBttn = () => {
        cy.get(this.botonBuscar).click();
    }

    Buscador = (Abuscar) =>{
        cy.get(this.buscador).type(Abuscar);
    }

    IngresarAProductoA16 = () => {
        cy.get(this.productoA16).click();
    }

    Filtrar = (item) =>{
        cy.get(this.filtros).contains(item).click({force: true});
    }

    VerficarFiltro = (verificar) => {
        cy.get(this.FiltrosSeleccionados).should('contains.text',verificar);
    }

    CantidadEquipos = () => {
        return cy.get(this.Resultados);
    }

    TercerTelefono= () =>{
        return cy.get('.product-item').eq(2);
    }

    SeleccionarOrdenPrecio = (orden)=>{
        return cy.get(this.SelectorOrden).select(orden);
    }

}

export default new TiendaPagina()