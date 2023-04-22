import ProductsListTable from "./productsListTable";

async function fetchProductsList(pageNumber: number, colors: string[]) {
  let url = `http://localhost:8080/products?page=${pageNumber}&limit=10`;
  if (colors?.length) {
    url = `${url}&color=${colors.join(",")}`;
  }
  const response = await fetch(url, {
    next: { revalidate: 0 }
  });
  const data = response?.json();
  return data;
}

async function fetchAllColors() {
  const response = await fetch("http://localhost:8080/products/colors");
  return response.json();
}

export default async function ProductsList({
  params
}: {
  params: { page: number; color: string[] };
}) {
  const { page, color } = params;
  const products = await fetchProductsList(page, color);
  const colors = await fetchAllColors();
  return <ProductsListTable response={products} colors={colors} />;
}
