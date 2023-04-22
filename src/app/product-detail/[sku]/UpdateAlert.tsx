"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertColor, Collapse } from "@mui/material";
import { UpdateAlertPropsType } from "@/app/types";
import { useGlobalContext } from "@/app/globalContext";

export default function UpdateAlert({ status }: UpdateAlertPropsType) {
  const router = useRouter();
  const { currentPage } = useGlobalContext();
  const [isToastOpen, setToastOpen] = useState<boolean>(true);
  return (
    <Collapse in={isToastOpen}>
      <Alert
        severity={status.type as AlertColor}
        onClose={() => {
          router.push(`http://localhost:3000/product-list/${currentPage}`);
          setToastOpen(false);
        }}
      >
        {status.message}
      </Alert>
    </Collapse>
  );
}
