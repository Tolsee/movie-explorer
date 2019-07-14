// @flow
export function formatDate(dateString: string) {
  const MONTHS = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${MONTHS[monthIndex]} ${day}, ${year}`;
}

export function formatTime(minutes: number) {
  const hrs = parseInt(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hrs) {
    return `${hrs} hr ${remainingMinutes} min`;
  } else {
    return `${remainingMinutes} min`;
  }
}
