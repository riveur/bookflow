import { BookCard, BookCardSkeleton } from "@/components/shared/book-card";
import { BookFilter } from "@/components/shared/book-filter";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useBooks } from "@/hooks/useBooks";
import { cn } from "@/lib/utils";
import { XCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { data: books, isLoading: isLoadingBooks, isSuccess: isSuccessBooks } = useBooks();
  const { roleIs } = useAuth();
  return (
    <>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Liste des livres</h2>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <BookFilter />
          {roleIs('LIBRARIAN') && <Link to="/books/add" className={cn(buttonVariants(), "flex-grow")}>Ajouter un livre</Link>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoadingBooks && Array.from({ length: 4 }).map((_, i) => <BookCardSkeleton key={i} />)}
        {(isSuccessBooks && books.length !== 0) && books.map((book) => <BookCard key={book.isbn} book={book} />)}
        {(isSuccessBooks && books.length === 0) && (
          <div className="col-span-12 flex flex-col gap-2 items-center justify-center h-[50dvh]">
            <XCircleIcon className="w-10 h-10" />
            <p className="text-center">Votre recherche ne correspond à aucun livre.</p>
          </div>
        )}
      </div>
    </>
  );
}