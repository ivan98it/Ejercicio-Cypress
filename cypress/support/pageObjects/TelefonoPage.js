class PhonePage {
    verMediosDePago = () => {
        cy.contains('Consultar medios de pago').click({force: true});
    }

    ValidarCuotas = (cuotas) => {
       cy.contains(cuotas).should('not.exist');
    }

}
export default new PhonePage()