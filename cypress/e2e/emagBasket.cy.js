describe('tests', () => {
    beforeEach(() => {
        cy.visit('https://www.emag.ro/')
    })
    it('Check that user is able to add products into the basket or to delete some of them', () => {
        cy.get('#searchboxTrigger').type('laptop{enter}')
        cy.get('.yeahIWantThisProduct').eq(0).click()
        cy.get('[data-dismiss="modal"]').eq(0).click()
        cy.get('.yeahIWantThisProduct').eq(1).click()
        cy.get('[data-dismiss="modal"]').eq(1).click()
        cy.get('.jewel-danger').eq(1).should('have.text', '2')
        cy.get('.btn-remove-product').eq(0).click()
        // sometimes at this  point the cart number of items is not updating correctly   
        //so if we want the test to be passed we have to click once on he cart icon.  
        cy.get('#my_cart').click()
        cy.get('.jewel-danger').eq(1).should('have.text', '1')
        cy.get('.btn-remove-product').eq(0).click()
        cy.get('#my_cart').click()
        cy.get('.jewel-danger').eq(1).should('have.text', '')
    })
})