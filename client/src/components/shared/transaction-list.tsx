import { Transaction } from "@/lib/validation";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { TransactionStatus } from "@/components/shared/transaction-status";
import { EndTransactionButton } from "@/components/shared/end-transaction-button";

interface TransactionListProps {
  transactions: Transaction[],
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Livre emprunté</TableHead>
          <TableHead>Examplaire</TableHead>
          <TableHead>Date d'emprunt</TableHead>
          <TableHead>Etat</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length !== 0 && transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.example.book.title}</TableCell>
            <TableCell>{transaction.example.id}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>
              <TransactionStatus status={transaction.status} />{' '}
              {['EMPRUNTE', 'ATTENTE_RETOUR'].includes(transaction.status) && (<span>(à rendre le {transaction.expected_return_date})</span>)}
              {transaction.status === 'RENDU' && (<span>({transaction.real_return_date})</span>)}
            </TableCell>
            <TableCell className="p-2">
              {['EMPRUNTE', 'ATTENTE_RETOUR'].includes(transaction.status) && (<EndTransactionButton transaction={transaction} />)}
              {transaction.status === 'RENDU' && (<span>-</span>)}
            </TableCell>
          </TableRow>
        ))}
        {transactions.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">Aucune transaction</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}