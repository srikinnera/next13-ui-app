import { AlertColor } from "@mui/material";

export type ProductType = {
  id: string;
  sku: string;
  name: string;
  type: string;
  price: number;
  description: string;
  color: string;
};

export type ProductResponseType = {
  products: ProductType[];
  length: number;
};

export type GlobalContextPropsType = {
  product: ProductType;
  setProduct: React.Dispatch<React.SetStateAction<ProductType>>;
};

export type UpdateAlertPropsType = {
  status: { message: string; type: string };
};
