import { Loader } from "@/components/shared/loader";
import { TransactionList } from "@/components/shared/transaction-list";
import { useMyTransactions } from "@/hooks/useMyTransactions";

export default function BorrowIndexPage() {
  const {
    data: transactions,
    isSuccess: isSuccessTransactions,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions
  } = useMyTransactions();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Liste de mes emprunts</h2>
      </div>
      {isLoadingTransactions && (
        <Loader />
      )}
      {isErrorTransactions && (
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="font-bold">Une erreur est survenue</p>
          </div>
        </div>
      )}
      {isSuccessTransactions && (<TransactionList transactions={transactions} />)}
    </>
  );
}