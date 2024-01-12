import { BookCard, BookCardSkeleton } from "@/components/shared/book-card";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useBooks } from "@/hooks/useBooks";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { data: books, isLoading: isLoadingBooks, isSuccess: isSuccessBooks } = useBooks();
  const { roleIs } = useAuth();
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Liste des livres</h2>
        <div className="flex items-center gap-2">
          {roleIs('LIBRARIAN') && <Link to="/books/add" className={buttonVariants()}>Ajouter un livre</Link>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoadingBooks && Array.from({ length: 4 }).map((_, i) => <BookCardSkeleton key={i} />)}
        {isSuccessBooks && books.map((book) => <BookCard key={book.isbn} book={book} />)}
      </div>
    </>
  );
}