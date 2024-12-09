export const unformatTransactionDate = (date: string) => {
  const dateString = date;

  const cleanString = dateString.replace(' às ', ' ');

  const [day, month, year, hours, minutes] = cleanString.match(/\d+/g)!;

  const resultDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes)
  );

  return resultDate;
};
