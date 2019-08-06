import { getDay, endOfMonth, subDays, format } from "date-fns";

const getlastFridayForMonth = date => {
  const lastDay = getDay(endOfMonth(date));
  switch (lastDay) {
    case 6:
      return subDays(endOfMonth(date), 1);
    default:
      return subDays(endOfMonth(date), lastDay + 2);
  }
};

const checkIflastFridayForMonth = date =>
  format(date, "DD/MM/YYYY") ===
  format(getlastFridayForMonth(date), "DD/MM/YYYY");

export default checkIflastFridayForMonth;
