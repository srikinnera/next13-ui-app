describe("Color filter", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/product-list/1");
  });

  it("User should be able to filter the products list by selecting one or more color filters", () => {
    cy.get('[data-testid="color-filter-label"]').should(
      "have.text",
      "Filter by Color:"
    );
    cy.get('label[value="black"]').click();
    cy.wait(1000);
    cy.get("tbody > tr[aria-hidden='false'] > td:nth-child(2)").each(
      (item, index, row) => {
        expect(Cypress.$(item).text()).to.eq("black");
      }
    );
  });
});
