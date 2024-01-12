import { fr } from "date-fns/locale";
import { format as f } from "date-fns";

export default function format(date: string, format: string = "PPpp") {
  return f(new Date(date), format, { locale: fr });
}