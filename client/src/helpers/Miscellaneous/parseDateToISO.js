import { parse, format } from 'date-fns';

function parseDateToISO(date) {
  if (!date) {
    return null;
  }
  return format(parse(date, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd');
}

export default parseDateToISO;
