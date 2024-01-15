import { Example, User } from "@/lib/validation";

export const exampleStates: Array<{ label: string, value: Example['state'] }> = [
  { label: "Neuf", value: "NEUF" },
  { label: "Bon", value: "BON" },
  { label: "Moyen", value: "MOYEN" },
  { label: "Mauvais", value: "MAUVAIS" }
] as const;

export const exampleAvailability: Array<{ label: string, value: Example['available'] | string }> = [
  { label: "Disponible", value: true },
  { label: "Indisponible", value: false }
] as const;

export const roles: Array<{ label: string, value: User['role'] }> = [
  { label: "Libraire", value: "LIBRARIAN" },
  { label: "Utilisateur", value: "USER" },
] as const;