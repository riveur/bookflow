import { Book } from "@/lib/validation"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const isBookAvailable = Number(book.available_examples) !== 0;
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="relative p-0 mb-6 h-[300px]">
        <img className="rounded-t-lg object-cover object-center overflow-hidden h-full" src={book.cover_url} alt={book.title} />
        <span className="absolute !m-0 right-0 top-0 p-1 px-2 rounded-bl-lg rounded-tr-lg bg-white text-sm">{book.category.name}</span>
        <span
          className={cn(
            "absolute bottom-2 right-2 flex items-center justify-center font-bold rounded-full w-10 h-10 bg-opacity-80",
            isBookAvailable ? "bg-green-200" : "bg-red-200"
          )}
        >
          {book.available_examples}
        </span>
      </CardHeader>
      <CardContent>
        <Link to={`/books/${book.isbn}`} className="font-semibold hover:underline">{book.title}</Link>
        <p className="text-sm">{book.author.name}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!isBookAvailable}>{isBookAvailable ? "Emprunter" : "Indisponible"}</Button>
      </CardFooter>
    </Card>
  );
}

export const BookCardSkeleton = () => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="relative p-0 mb-6 h-[300px]">
        <Skeleton className="rounded-t-lg object-cover object-center overflow-hidden h-full" />
        <Skeleton className="absolute !m-0 right-0 top-0 p-1 px-2 h-6 w-[70px] rounded-bl-lg border border-t-0 border-l-0" />
        <Skeleton className="border absolute bottom-2 right-2 rounded-full w-10 h-10" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-2 w-[70%]" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}