import { parse, format } from "date-fns";

function parseDateToISO(date) {
    if (!date) {
        return;
    }
    return format(parse(date, "dd/MM/yyyy", new Date()), "yyyy-MM-dd");
}

export default parseDateToISO;