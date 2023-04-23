This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm i 
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Also make sure to run the backend app in your local, which runs on port 8080. 


## Features

The initial page on load routes to a product-list page. This page has a table to view the products' name, type, color, price. The last column has two buttons for Edit and Delete. 

Edit button loads the detail /product-detail/[sku] page where the user can edit the product details. On clicking update, when the product updates successfully, on clicking close on the alert message will re-route back to the product list page. User should now see the update product in the table in /product-list. 

On clicking Delete button in /product-list page, it opens a confirmation modal asking the user if they are sure that they want to delete the product listing. On confirmation, the product is deleted. Now the table refreshes and the deleted product should no longer be visible. 

Pagination is shown at the bottom of the table. Each page has a default page size of 10. User needs to click either the next button or the page number button to navigate to the next 10 items in next page. 

Filter by color option is given to the user in /product-list page. User can select one or more or all color checkboxes to filter the product list table accordingly. Unchecking all the checkboxes will load back all the products of all colors. 

## Tests

To run the unit tests run 

```bash
npm run test
```

## Cypress

To run the cypress tests run 

```bash
npm run cypress:open
```