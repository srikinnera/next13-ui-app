describe("Product List page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/product-list/1");
  });

  //Test for page renders
  it("renders the product list page", () => {
    cy.contains("table", "NAME");
    cy.contains("table", "COLOR");
    cy.contains("table", "TYPE");
    cy.contains("table", "PRICE");
    cy.get('[data-testid="edit-button"]').should("have.length.gt", 0);
    cy.get('[data-testid="delete-button"]').should("have.length.gt", 0);
    cy.get('[data-testid="pagination"]').should("be.visible");
  });

  //Test if 10 items are listed and pagination works
  it("Displays the correct number of products on each page and navigates to the correct pages", () => {
    // Wait for the table to load
    cy.get('[aria-label="product-list-table"] tbody').should("exist");

    // Ensure there are exactly 10 rows in the table body
    cy.get('[aria-label="product-list-table"] tbody tr').should(
      "have.length",
      10
    );

    // Go to next page
    cy.get('button[aria-label="next page button"]').click();
    cy.url().should("include", "/product-list/2");

    // Go to previous page
    cy.get('button[aria-label="previous page button"]').click();
    cy.url().should("include", "/product-list/1");
  });

  //Test for deleting a product
  it("Deletes a product", () => {
    // Find a delete button and capture the product name
    cy.get('[data-testid="delete-button"]')
      .first()
      .parent()
      .siblings()
      .first()
      .invoke("text")
      .as("productName");

    // Click the delete button
    cy.get('[data-testid="delete-button"]').first().click();

    // Confirm deletion
    cy.get('[data-testid="confirm-delete-button"]').click();

    // Verify that the product is no longer in the table
    cy.contains("table", "@productName").should("not.exist");
  });
});
