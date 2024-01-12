import { Example } from "@/lib/validation";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ExampleState } from "@/components/shared/example-status";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AddExampleForm } from "@/components/forms/add-example-form";

interface ExampleListProps {
  examples: Example[],
  isbn: string,
  showAddForm?: boolean
}

export const ExampleList: React.FC<ExampleListProps> = ({ examples, isbn, showAddForm = false }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Etat</TableHead>
          <TableHead>Disponibilité</TableHead>
          <TableHead>Date d'ajout</TableHead>
          <TableHead>Dernière utilisation</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {examples.length !== 0 && examples.map((example) => (
          <TableRow key={example.id}>
            <TableCell><ExampleState state={example.state} /></TableCell>
            <TableCell>{example.available ? "Disponible" : "Indisponible"}</TableCell>
            <TableCell>{example.created_at}</TableCell>
            <TableCell>{example.updated_at}</TableCell>
            <TableCell>
              {example.available && (<Link className={buttonVariants()} to={`/books/${example.book_isbn}/borrow/${example.id}`}>Emprunter</Link>)}
              {!example.available && (<Button disabled>Indisponible</Button>)}
            </TableCell>
          </TableRow>
        ))}
        {examples.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">Aucun examplaire</TableCell>
          </TableRow>
        )}
      </TableBody>
      {showAddForm && (
        <TableFooter>
          <AddExampleForm isbn={isbn} />
        </TableFooter>
      )}
    </Table>
  );
}