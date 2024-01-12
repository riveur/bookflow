import { fr } from "date-fns/locale";
import { format as f } from "date-fns";

export default function format(date: string | Date, format: string = "PPpp") {
  return f(date, format, { locale: fr });
}