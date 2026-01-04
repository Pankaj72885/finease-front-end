import TransactionForm from "@/components/transactions/TransactionForm";
import { useAuth } from "@/Contexts/AuthContext";
import { useTransactions } from "@/Hooks/useTransactions";
import { ArrowLeft, PlusCircle, Receipt } from "lucide-react";
import { Link } from "react-router";

const AddTransaction = () => {
  const { currentUser } = useAuth();
  const { createTransaction, isCreating } = useTransactions(currentUser?.email);

  const handleSubmit = (data) => {
    createTransaction(data);
  };

  if (!currentUser) {
    return (
      <div className="pt-24 pb-12">
        <div className="container-tight text-center py-20">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Receipt size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Authentication Required
          </h3>
          <p className="text-muted-foreground mb-6">
            Please log in to add a transaction
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      <div className="container-tight">
        {/* Back Link */}
        <Link
          to="/my-transactions"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back to Transactions
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            <PlusCircle size={14} />
            <span>New Entry</span>
          </div>
          <h1 className="text-3xl font-bold font-outfit">Add Transaction</h1>
          <p className="text-muted-foreground mt-2">
            Record your income or expense to keep track of your finances
          </p>
        </div>

        {/* Form Card */}
        <div className="card-base p-6 md:p-8">
          <TransactionForm onSubmit={handleSubmit} isSubmitting={isCreating} />
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
