class PhonePage {
constructor (){
    this.TituloDeProducto =':nth-child(1) > .page-title > .base';
    this.Cuotas = '.price-content > :nth-child(5)';
    this.FlechaBanco = '#banksArrow';
    this.FlechaTarjeta = '#cardsArrow';
    this.SeleccionBanco = '.card-selector._collapse';
    this.SeleccionTarjeta = '#cardSelector';
    this.DetalleCuotas = '#installmentsTable';
    this.CruzCierreModal = '.installments-modal > .modal-inner-wrap > .modal-header > .action-close';
    this.Prelanzamiento = '.featured-tag';
    this.Retiro ='.text-container';
    this.Correo= '#sucursal-item > .text-container > .shipping';
}

ObtenerTitulo = () =>{
    return cy.get(this.TituloDeProducto);
}

CuadoDeCuotas = () => {
    return cy.get(this.Cuotas);
}


verMediosDePago = () => {
    cy.contains('Consultar medios de pago').click({force: true});
}

ValidarCuotas = (cuotas) => {
    cy.contains(cuotas).should('not.exist');
}

DespegarBancos = () =>{
    cy.get(this.FlechaBanco).click({force: true});
}

DesplegarTarjetas = () =>{
    cy.get(this.FlechaTarjeta).click({force: true});
}

SeleccionadorBancos = () =>{
    return cy.get(this.SeleccionBanco);
}

SeleccionadorTarjetas = () =>{
    return cy.get(this.SeleccionTarjeta);
}

TablaDeCuotas = () =>{
    return cy.get(this.DetalleCuotas);
}

CerrarModal = () =>{
    cy.get(this.CruzCierreModal).click();
}

CuadroPrelanzamiento = () =>{
    return cy.get(this.Prelanzamiento);
}

CuadroRetiro = () =>{
    return cy.get(this.Retiro);
}

CuadroCorreo = ()=>{
    return cy.get(this.Correo);
}


}
export default new PhonePage()