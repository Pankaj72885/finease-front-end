import TransactionForm from "@/components/transactions/TransactionForm";
import { useAuth } from "@/Contexts/AuthContext";
import { useTransactions } from "@/Hooks/useTransactions";

const AddTransaction = () => {
  const { currentUser } = useAuth();

  const { createTransaction, isCreating } = useTransactions(currentUser?.email);

  const handleSubmit = (data) => {
    createTransaction(data);
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Add Transaction</h1>
        <p className="text-center">Please log in to add a transaction.</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add Transaction</h1>
      <TransactionForm onSubmit={handleSubmit} isSubmitting={isCreating} />
    </div>
  );
};

export default AddTransaction;
