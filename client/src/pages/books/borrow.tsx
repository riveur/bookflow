import { BorrowBookForm } from "@/components/forms/borrow-book-form";
import { ExampleList } from "@/components/shared/example-list";
import { ExampleState } from "@/components/shared/example-status";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useBook } from "@/hooks/useBook";
import { useBookExample } from "@/hooks/useBookExample";
import { useBookExamples } from "@/hooks/useBookExamples";
import { AlertTriangleIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export default function BookBorrowPage() {
  const params = useParams<{ isbn: string, exampleId?: string }>();
  const { data: book } = useBook(params.isbn!);
  const { data: examples, isSuccess: isSuccessExamples } = useBookExamples(params.isbn!, !!book && !params.exampleId);
  const { data: example } = useBookExample({
    params: {
      isbn: params.isbn!,
      exampleId: params.exampleId!
    },
    enabled: params.exampleId !== undefined
  });

  if (!book) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-2xl text-center">Livre introuvable</h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center">Emprunter <span className="font-bold uppercase">{book.title} ({book.author.name})</span></h1>
      <div className="flex items-center justify-center">
        <Separator className="w-[50%] my-4" />
      </div>
      {params.exampleId && example ? (
        <>
          <p className="text-center mb-4">Vous avez choisi l'exemplaire: <span className="font-bold">{example.id}</span></p>
          <div className="flex items-center justify-center">
            <div className="flex gap-4 mb-4">
              <p>Etat: <ExampleState state={example.state} /></p>
              <p>Disponibilité: {example.available ? "Disponible" : "Indisponible"}</p>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <BorrowBookForm example={example} />
          </div>
        </>
      ) : (
        <>
          <Alert variant="warning">
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertDescription>
              Pour emprunter un livre vous devez d'abord choisir un exemplaire.
            </AlertDescription>
          </Alert>
          <h2 className="text-center font-semibold my-4">Exemplaires</h2>
          <ExampleList isbn={book.isbn} examples={isSuccessExamples ? examples : []} />
        </>
      )}
    </>
  );

}