const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novemnber",
  "December",
];

export const formatDateToMonthName = (value: string) => {
  const date = new Date(value);

  return (
    date.getDay() +
    1 +
    " " +
    monthNames[date.getMonth()] +
    " " +
    date.getFullYear()
  );
};
