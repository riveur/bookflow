import { Transaction } from "@/lib/validation";
import React from "react";

interface TransactionStatusProps {
  status: Transaction["status"]
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({ status }) => {
  switch (status) {
    case 'RENDU':
      return <span className="border px-2 py-1 rounded-sm border-green-500">Rendu</span>;
    case 'EMPRUNTE':
      return <span className="border px-2 py-1 rounded-sm border-yellow-500">Emprunté</span>;
    case 'ATTENTE_RETOUR':
      return <span className="border px-2 py-1 rounded-sm border-yellow-700">En attente de retour</span>;
  }
}