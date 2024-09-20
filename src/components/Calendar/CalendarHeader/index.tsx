import { addMonths, subMonths, format } from "date-fns";
import { ko } from "date-fns/locale";
import styles from "./index.module.css";
import { Button } from "@/components/common/Button";

type Props = {
  setCurrentDate: (date: Date) => void;
  currentDate: Date;
};

export const CalendarHeader = ({ setCurrentDate, currentDate }: Props) => {
  const prevMonthDate = subMonths(currentDate, 1);
  const nextMonthDate = addMonths(currentDate, 1);

  const nextMonth = () => {
    setCurrentDate(nextMonthDate);
  };

  const prevMonth = () => {
    setCurrentDate(prevMonthDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className={styles.headerWrapper}>
      <Button onClick={prevMonth}>
        {format(prevMonthDate, "M", { locale: ko })}
      </Button>
      <Button onClick={goToToday}>오늘</Button>
      <Button onClick={nextMonth}>
        {format(nextMonthDate, "M", { locale: ko })}
      </Button>
    </div>
  );
};
