import { formatDate } from 'date-fns';

function formatModifiedDate(date) {
  if (!date) return null;

  const today = new Date();
  const thisYear = today.getFullYear();
  const lastModifiedDateObj = new Date(date);
  let formattedDate;

  if (
    lastModifiedDateObj.getDate() === today.getDate() &&
    lastModifiedDateObj.getMonth() === today.getMonth() &&
    lastModifiedDateObj.getFullYear() === today.getFullYear()
  ) {
    formattedDate = formatDate(date, 'h:mma');
  } else if (lastModifiedDateObj.getFullYear() === thisYear) {
    formattedDate = formatDate(date, 'dd MMM');
  } else {
    formattedDate = formatDate(date, 'dd MMM yyyy');
  }

  return formattedDate;
}

export default formatModifiedDate;
