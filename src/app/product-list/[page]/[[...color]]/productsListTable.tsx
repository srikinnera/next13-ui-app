"use client";
import { useState } from "react";
import { Table, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/globalContext";
import { ProductResponseType, ProductType } from "@/app/types";
import ColorFilter from "./colorFilter";
import DeleteConfirmationModal from "./deleteConfirmationModal";
import styles from "./productsListTable.module.css";

export default function ProductsListTable({
  response,
  colors
}: {
  response: ProductResponseType;
  colors: string[];
}) {
  const [isDeleteConfirmationOpen, setOpenDeleteConfirmation] =
    useState<boolean>(false);
  const { products, length } = response;
  const router = useRouter();
  const { product, setProduct, currentPage, setCurrentPage } =
    useGlobalContext();
  return (
    <div className={styles.tableContainer}>
      <ColorFilter colors={colors} productsLength={length} />
      <Table
        aria-label="product-list-table"
        css={{
          height: "auto",
          width: "100%"
        }}
      >
        <Table.Header>
          <Table.Column>NAME</Table.Column>
          <Table.Column>COLOR</Table.Column>
          <Table.Column>TYPE</Table.Column>
          <Table.Column>PRICE</Table.Column>
          <Table.Column align="center">EDIT & DELETE</Table.Column>
        </Table.Header>
        <Table.Body>
          {products.map((product: ProductType) => (
            <Table.Row key={`${product.id}-${product.sku}`}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.color}</Table.Cell>
              <Table.Cell>{product.type}</Table.Cell>
              <Table.Cell>{`$${product.price}`}</Table.Cell>
              <Table.Cell
                css={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Button
                  className={styles.actionButton}
                  onPress={() => {
                    setProduct(product);
                    router.push(`/product-detail/${product.sku}`);
                  }}
                >
                  Edit
                </Button>
                <Button
                  flat
                  color="error"
                  className={styles.actionButton}
                  onPress={() => {
                    setProduct(product);
                    setOpenDeleteConfirmation(true);
                  }}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Pagination
          shadow
          noMargin
          align="center"
          initialPage={currentPage}
          rowsPerPage={10}
          total={Math.ceil(length / 10)}
          onPageChange={(page) => {
            if (length > 0) {
              setCurrentPage(page);
              router.push(`http://localhost:3000/product-list/${page}`);
            }
          }}
        />
      </Table>
      <DeleteConfirmationModal
        open={isDeleteConfirmationOpen}
        product={product}
        handleSetOpenDeleteConfirmation={setOpenDeleteConfirmation}
      />
    </div>
  );
}
