import { useEffect, useState } from "react";
import { Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import styles from "./productsListTable.module.css";
import { useGlobalContext } from "@/app/globalContext";

export default function ColorFilter({
  colors,
  productsLength
}: {
  colors: string[];
  productsLength: number;
}) {
  const router = useRouter();
  const { setSelectedColors, selectedColors, setCurrentPage, currentPage } =
    useGlobalContext();
  const [checked, setIsChecked] = useState<string[]>([]);

  const handleSelectionChange = (checkedColors: string[]) => {
    setCurrentPage(1);
    setSelectedColors(checkedColors);
  };

  useEffect(() => {
    setIsChecked(selectedColors);
    if (selectedColors.length) {
      router.push(
        `http://localhost:3000/product-list/${currentPage}/${selectedColors.join(
          ","
        )}`
      );
    }
    if (selectedColors.length === 0) {
      router.push(`http://localhost:3000/product-list/${currentPage}`);
    }
  }, [selectedColors, router, setIsChecked, currentPage]);

  useEffect(() => {
    if (productsLength === 0) {
      setSelectedColors([]);
      router.push(`http://localhost:3000/product-list/${currentPage}`);
    }
  }, [productsLength, setSelectedColors, router, currentPage]);

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
          <Checkbox
            key={`${color}`}
            value={`${color}`}
            className={styles.colorSelection}
          >
            {color}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
}
