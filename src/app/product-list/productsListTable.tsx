"use client";
import { Table, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/globalContext";
import { ProductResponseType, ProductType } from "@/app/types";
import styles from "./productsListTable.module.css";

export default function ProductsListTable({
  response
}: {
  response: ProductResponseType;
}) {
  const { products } = response;
  const router = useRouter();
  const { setProduct } = useGlobalContext();
  return (
    <>
      <Table
        aria-label="product-list-table"
        css={{
          height: "auto",
          minWidth: "100%"
        }}
      >
        <Table.Header>
          <Table.Column>NAME</Table.Column>
          <Table.Column>COLOR</Table.Column>
          <Table.Column>TYPE</Table.Column>
          <Table.Column>PRICE</Table.Column>
          <Table.Column>EDIT & DELETE</Table.Column>
        </Table.Header>
        <Table.Body>
          {products.map((product: ProductType) => (
            <Table.Row key={`${product.id}-${product.sku}`}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.color}</Table.Cell>
              <Table.Cell>{product.type}</Table.Cell>
              <Table.Cell>{`$${product.price}`}</Table.Cell>
              <Table.Cell>
                <Button
                  className={styles.actionButton}
                  onPress={() => {
                    setProduct(product);
                    router.push(`/product-detail/${product.sku}`);
                  }}
                >
                  Edit
                </Button>
                <Button className={styles.actionButton}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          rowsPerPage={10}
          onPageChange={(page) => console.log({ page })}
        />
      </Table>
    </>
  );
}
