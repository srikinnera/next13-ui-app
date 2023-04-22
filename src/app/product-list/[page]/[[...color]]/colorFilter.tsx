import { useEffect, useState } from "react";
import { Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import styles from "./productsListTable.module.css";
import { useGlobalContext } from "@/app/globalContext";

export default function ColorFilter({ colors }: { colors: string[] }) {
  const router = useRouter();
  const { setSelectedColors, selectedColors, setCurrentPage, currentPage } =
    useGlobalContext();
  const [checked, setIsChecked] = useState<string[]>([]);

  const handleSelectionChange = (checkedColors: string[]) => {
    setSelectedColors(checkedColors);
  };

  useEffect(() => {
    setIsChecked(selectedColors);
    if (selectedColors.length) {
      setCurrentPage(1);
      router.push(
        `http://localhost:3000/product-list/1/${selectedColors.join(",")}`
      );
    } else {
      router.push(`http://localhost:3000/product-list/${currentPage}`);
    }
  }, [selectedColors, router, setIsChecked, setCurrentPage]);

  return (
    <div className={styles.filterContainer}>
      <span className={styles.filterLabel}>Filter by Color:</span>
      <Checkbox.Group
        color="secondary"
        orientation="horizontal"
        onChange={handleSelectionChange}
        className={styles.filters}
        value={checked}
      >
        {colors.map((color) => (
          <Checkbox value={`${color}`} className={styles.colorSelection}>
            {color}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
}
