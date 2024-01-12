import { UpdateBookForm } from "@/components/forms/update-book-form";
import { ExampleState } from "@/components/shared/example-status";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";
import { useBook } from "@/hooks/useBook";
import { useBookExamples } from "@/hooks/useBookExamples";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom"

export default function BookShowPage() {
  const params = useParams();
  const { roleIs } = useAuth();
  const { data: book, isLoading: isLoadingBook, isError: isErrorBook, isSuccess: isSuccessBook } = useBook(params.isbn!);
  const { data: examples, isSuccess: isSuccessExamples } = useBookExamples(params.isbn!, !!book);
  if (isLoadingBook) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-bold">Chargement...</p>
          <p><Loader className="h-8 w-8 animate-spin" /></p>
        </div>
      </div>
    );
  }

  if (isErrorBook || !isSuccessBook) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="font-bold">Une erreur est survenue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4 lg:col-span-3">
        <img className="w-full h-auto" src={book.cover_url} alt={book.title} />
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        {roleIs('LIBRARIAN') ? (<UpdateBookForm book={book} />) : (
          <>
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p>Ecrit par - {book.author.name}</p>
            <p>Catégorie - {book.category.name}</p>
            <p>Ajouté le - {book.created_at}</p>
            <p>Dernière modification - {book.updated_at}</p>
          </>
        )}
        <Separator className="my-4" />
        <p>Exaplaires disponibles - <span className="font-bold">{book.available_examples}</span></p>
        <p>Exaplaires indisponibles - <span className="font-bold">{book.unavailable_examples}</span></p>
        <Separator className="my-4" />
        <h2 className="font-bold text-xl text-center">Examplaires</h2>
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
            {isSuccessExamples && examples.map((example) => (
              <TableRow key={example.id}>
                <TableCell><ExampleState state={example.state} /></TableCell>
                <TableCell>{example.available ? "Disponible" : "Indisponible"}</TableCell>
                <TableCell>{example.created_at}</TableCell>
                <TableCell>{example.updated_at}</TableCell>
                <TableCell>
                  <Button size="sm" disabled={!example.available}>{example.available ? "Emprunter" : "Indisponible"}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}