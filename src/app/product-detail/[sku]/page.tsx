"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button } from "@nextui-org/react";
import { useGlobalContext } from "@/app/globalContext";
import UpdateAlert from "./UpdateAlert";
import styles from "./page.module.css";

const schema = yup
  .object({
    name: yup.string().required(),
    type: yup.string().required(),
    description: yup.string().required(),
    color: yup.string().required(),
    price: yup
      .number()
      .required()
      .test(
        "Is positive?",
        "Price must be greater than 0!",
        (value) => value > 0
      )
  })
  .required();

export default function ProductDetailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }
  } = useForm({ resolver: yupResolver(schema) });
  const [status, setUpdateStatus] = useState({ message: "", type: "" });
  const { product } = useGlobalContext();
  const { id, sku, name, description, type, color, price } = product;
  const onSubmit = (data: any) => {
    const reqObj = { ...data, sku, id, price: Number(data.price) };
    fetch(`http://localhost:8080/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(reqObj),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(() =>
        setUpdateStatus({
          message: "Product details updated successfully",
          type: "success"
        })
      )
      .catch((error) => setUpdateStatus({ message: error, type: "error" }));
  };
  return (
    <>
      {status.type !== "" && <UpdateAlert status={status} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label} aria-label="name">
          Name
        </label>
        <Input
          initialValue={name}
          defaultValue={name}
          {...register("name")}
          className={styles.formInput}
          width="540px"
        />
        {formErrors.name && (
          <p className={styles.errors}>
            {formErrors.name?.message?.toString()}
          </p>
        )}
        <label className={styles.label} aria-label="type">
          Type
        </label>
        <Input
          initialValue={type}
          defaultValue={type}
          {...register("type")}
          className={styles.formInput}
          width="540px"
        />
        {formErrors.type && (
          <p className={styles.errors}>
            {formErrors.type?.message?.toString()}
          </p>
        )}
        <label className={styles.label} aria-label="description">
          Description
        </label>
        <Input
          initialValue={description}
          defaultValue={description}
          {...register("description")}
          className={styles.formInput}
          maxLength={56}
          width="540px"
        />
        {formErrors.description && (
          <p className={styles.errors}>
            {formErrors.description?.message?.toString()}
          </p>
        )}
        <label className={styles.label} aria-label="color">
          Color
        </label>
        <Input
          initialValue={color}
          defaultValue={color}
          {...register("color")}
          className={styles.formInput}
          width="540px"
        />
        {formErrors.color && (
          <p className={styles.errors}>
            {formErrors.color?.message?.toString()}
          </p>
        )}
        <label className={styles.label} aria-label="price">
          Price
        </label>
        <Input
          type="number"
          initialValue={price.toString()}
          defaultValue={price}
          {...register("price")}
          className={styles.formInput}
          width="540px"
        />
        {formErrors.price && (
          <p className={styles.errors}>
            {formErrors.price?.message?.toString()}
          </p>
        )}
        <Button type="submit" className={styles.button}>
          UPDATE
        </Button>
      </form>
    </>
  );
}
