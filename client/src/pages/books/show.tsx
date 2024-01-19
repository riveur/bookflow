import { UpdateBookForm } from "@/components/forms/update-book-form";
import { ExampleList } from "@/components/shared/example-list";
import { Loader } from "@/components/shared/loader";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useBook } from "@/hooks/useBook";
import { useBookExamples } from "@/hooks/useBookExamples";
import { useParams } from "react-router-dom"

export default function BookShowPage() {
  const params = useParams();
  const { roleIs } = useAuth();
  const { data: book, isLoading: isLoadingBook, isError: isErrorBook, isSuccess: isSuccessBook } = useBook(params.isbn!);
  const { data: examples, isSuccess: isSuccessExamples } = useBookExamples(params.isbn!, !!book);
  if (isLoadingBook) {
    return (
      <Loader />
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
        <img className="w-full h-auto rounded-lg" src={book.cover_url} alt={book.title} />
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
        <h2 className="font-bold text-xl text-center">Exemplaires</h2>
        <ExampleList isbn={book.isbn} showAddForm={roleIs('LIBRARIAN')} examples={isSuccessExamples ? examples : []} />
      </div>
    </div>
  );
}