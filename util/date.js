export function getDate(date) {
  let dateObj = {
    day: date.getDate(),
    month: date.toLocaleString('default', { month: 'short' }),
    year: date.getFullYear(),
  };

  return dateObj;
}

export function getTime(time) {
  // let date = new Date();
  let hours = (time.getHours() < 10 ? '0' : '') + time.getHours();
  let minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
  return hours + ':' + minutes;
}
