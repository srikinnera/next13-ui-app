import { Modal, Text, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ProductType } from "../types";
import UpdateAlert from "../product-detail/[sku]/UpdateAlert";

export default function DeleteConfirmationModal({
  open,
  product,
  handleSetOpenDeleteConfirmation
}: {
  open: boolean;
  product: ProductType;
  handleSetOpenDeleteConfirmation: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) {
  const router = useRouter();
  console.log("product", product);
  const handleDelete = async () => {
    console.log("handle delete");
    await fetch(`http://localhost:8080/products/${product.id}`, {
      method: "DELETE"
    })
      .then(() => {
        handleSetOpenDeleteConfirmation(false);
        router.refresh();
      })
      .catch((error) => {
        <UpdateAlert status={{ message: error, type: "error" }} />;
      });
  };
  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={open}
      preventClose
      onClose={() => handleSetOpenDeleteConfirmation(false)}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          {`Are you sure you want to delete ${product.name} - ${product.sku} product listing`}
        </Text>
      </Modal.Header>
      <Modal.Footer>
        <Button auto flat color="error" onPress={handleDelete}>
          Delete
        </Button>
        <Button auto onPress={() => handleSetOpenDeleteConfirmation(false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
