import { useQuery } from "react-query";
import { useAuth } from "./useAuth";
import { getBookExample } from "@/lib/client";

interface UseBookExampleParams {
  params: {
    isbn: string;
    exampleId: string;
  };
  enabled: boolean;
}

export const useBookExample = ({ params, enabled }: UseBookExampleParams) => {
  const { data: user } = useAuth();
  return useQuery({
    queryKey: ["books", params.isbn, "examples", params.exampleId],
    queryFn: () => getBookExample(params.isbn, params.exampleId),
    enabled: !!user && enabled,
  });
}