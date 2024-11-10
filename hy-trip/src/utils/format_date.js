import dayjs from "dayjs";

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day");
}

export function formatMouthDate(date, fm = "MM月DD日") {
  return dayjs(date).format(fm);
}
