import ProductsListTable from "./productsListTable";

async function fetchProductsList() {
  const response = await fetch("http://localhost:8080/products");
  const data = response.json();
  return data;
}

export default async function ProductsList() {
  const products = await fetchProductsList();
  return <ProductsListTable response={products} />;
}
