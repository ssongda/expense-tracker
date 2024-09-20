import React, { useState, useEffect } from "react";
import styles from "./index.module.css";

interface YearSelectorProps {
  currentYear: number;
  onYearChange: (year: number) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  currentYear,
  onYearChange,
}) => {
  const [years, setYears] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(50);

  useEffect(() => {
    const yearList = Array.from(
      { length: 101 },
      (_, i) => currentYear - 50 + i
    );
    setYears(yearList);
    setSelectedIndex(50);
  }, [currentYear]);

  const handleYearClick = (year: number) => {
    const index = years.indexOf(year);
    setSelectedIndex(index);
    onYearChange(year);
  };

  const handleLeftClick = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      onYearChange(years[selectedIndex - 1]);
    }
  };

  const handleRightClick = () => {
    if (selectedIndex < years.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      onYearChange(years[selectedIndex + 1]);
    }
  };

  return (
    <div className={styles.yearSelector}>
      <button className={styles.arrowButton} onClick={handleLeftClick}>
        ◀
      </button>
      <div className={styles.yearList}>
        {years
          .slice(
            Math.max(0, selectedIndex - 2),
            Math.min(years.length, selectedIndex + 3)
          )
          .map((year) => (
            <div
              key={year}
              className={`${styles.yearItem} ${
                year === years[selectedIndex]
                  ? styles.selectedYear
                  : styles.unselectedYear
              }`}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </div>
          ))}
      </div>
      <button className={styles.arrowButton} onClick={handleRightClick}>
        ▶
      </button>
    </div>
  );
};

export default YearSelector;
