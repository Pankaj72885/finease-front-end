import TransactionForm from "@/components/transactions/TransactionForm";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/Contexts/AuthContext";
import { useTransaction, useTransactions } from "@/Hooks/useTransactions";
import { queryKeys } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Edit, FileText } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { transaction, isLoading } = useTransaction(id);
  const { updateTransaction, isUpdating } = useTransactions(currentUser?.email);

  const handleSubmit = (data) => {
    updateTransaction(
      { id, data },
      {
        onSuccess: () => {
          // Invalidate BOTH the single transaction and the list of transactions
          queryClient.invalidateQueries({
            queryKey: queryKeys.transactionById(id),
          });
          queryClient.invalidateQueries({
            queryKey: queryKeys.transactionsByUser(
              currentUser?.email,
              "createdAt",
              "desc"
            ),
          });

          navigate(`/transaction/${id}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-12">
        <div className="container-tight">
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="pt-24 pb-12">
        <div className="container-tight text-center py-20">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <FileText size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Transaction not found</h3>
          <p className="text-muted-foreground mb-6">
            This transaction may have been deleted or doesn't exist
          </p>
          <Link to="/my-transactions">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft size={16} />
              Back to Transactions
            </Button>
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
          to={`/transaction/${id}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back to Transaction Details
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
            <Edit size={14} />
            <span>Edit Mode</span>
          </div>
          <h1 className="text-3xl font-bold font-outfit">Update Transaction</h1>
          <p className="text-muted-foreground mt-2">
            Modify the transaction details below
          </p>
        </div>

        {/* Form Card */}
        <div className="card-base p-6 md:p-8">
          <TransactionForm
            initialData={transaction}
            onSubmit={handleSubmit}
            isEditing={true}
            isSubmitting={isUpdating}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateTransaction;
