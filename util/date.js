export function getDate(date) {
  let dateObj = {
    day: date.getDate(),
    month: date.toLocaleString('default', { month: 'short' }),
    year: date.getFullYear(),
  };

  return dateObj;
}
