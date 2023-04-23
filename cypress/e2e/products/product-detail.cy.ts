describe("Edit Product Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/product-list/1");
  });

  //Test for rendering page
  it("page renders", () => {
    cy.get('[data-testid="edit-button"]').first().click();
    cy.url().should("include", "/product-detail/");
    cy.get("form").should("be.visible");
  });

  //Test for updating product
  it("should update the product details", () => {
    cy.get('[data-testid="edit-button"]').first().click();
    cy.url().should("include", "/product-detail/");

    // Fill out the form inputs with new values
    cy.get('input[name="name"]').clear().type("New Product Name");
    cy.get('input[name="type"]').clear().type("New Product Type");
    cy.get('input[name="description"]').clear().type("New Product Description");
    cy.get('input[name="color"]').clear().type("white");
    cy.get('input[name="price"]').clear().type("100");

    // Click the "UPDATE" button
    cy.get('button[type="submit"]').click();

    // Check that the update was successful
    cy.get('[data-testid="update-alert"]').should("exist");

    // Click on the "Close" button of the toast
    cy.get('[data-testid="CloseIcon"]').click();

    // Check if it redirects to the correct page
    cy.url().should("include", "/product-list/");
  });

  //Test for error messages
  it("should show error messages", () => {
    // Click on the "Edit" button of the first product
    cy.get('[data-testid="edit-button"]').first().click();
    cy.url().should("include", "/product-detail/");

    // Clear all form inputs
    cy.get('input[name="name"]').clear();
    cy.get('input[name="type"]').clear();
    cy.get('input[name="description"]').clear();
    cy.get('input[name="color"]').clear();
    cy.get('input[name="price"]').clear().type("-100");

    // Click the "UPDATE" button
    cy.get('button[type="submit"]').click();

    // Check that an error message is displayed for empty text boxes and negative price
    cy.get('[data-testid="error-message"]').contains(
      "name is a required field"
    );
    cy.get('[data-testid="error-message"]').contains(
      "type is a required field"
    );
    cy.get('[data-testid="error-message"]').contains(
      "description is a required field"
    );
    cy.get('[data-testid="error-message"]').contains(
      "color is a required field"
    );
    cy.get('[data-testid="error-message"]').contains(
      "Price must be greater than 0!"
    );
  });
});
