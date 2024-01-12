import { Example } from "@/lib/validation"
import React from "react"

interface ExampleStateProps {
  state: Example["state"]
}

export const ExampleState: React.FC<ExampleStateProps> = ({ state }) => {
  switch (state) {
    case 'NEUF':
      return <span className="border px-2 py-1 rounded-sm border-green-500">Neuf</span>;
    case 'BON':
      return <span className="border px-2 py-1 rounded-sm border-yellow-500">Bon</span>;
    case 'MOYEN':
      return <span className="border px-2 py-1 rounded-sm border-yellow-700">Moyen</span>;
    case 'MAUVAIS':
      return <span className="border px-2 py-1 rounded-sm border-red-500">Mauvais</span>;
  }
}