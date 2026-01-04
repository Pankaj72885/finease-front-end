import { Skeleton } from "@/components/Common/Skeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Contexts/AuthContext";
import { useTransaction, useTransactions } from "@/Hooks/useTransactions";
import { queryKeys, transactionAPI } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Edit,
  FileText,
  Tag,
  Trash2,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const TransactionDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { transaction, isLoading } = useTransaction(id);
  const { deleteTransaction } = useTransactions(currentUser?.email);

  // Get all transactions for category total calculation
  const { data: allTransactions } = useQuery({
    queryKey: queryKeys.transactionsByUser(
      currentUser?.email,
      "createdAt",
      "desc"
    ),
    queryFn: () =>
      transactionAPI.getAll(currentUser?.email, "createdAt", "desc"),
    enabled: !!currentUser?.email,
    staleTime: 5 * 60 * 1000,
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Delete Transaction?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f3f4f6"
        : "#1f2937",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-xl",
        cancelButton: "rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTransaction(id, {
          onSuccess: () => {
            navigate("/dashboard/transactions");
          },
        });
      }
    });
  };

  const calculateCategoryTotal = () => {
    if (!transaction || !allTransactions) return 0;

    const category = transaction.category;
    const type = transaction.type;

    return allTransactions
      .filter((t) => t.category === category && t.type === type)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-12">
        <div className="container-tight">
          <div className="card-base p-8 space-y-8">
            <div className="flex justify-between">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-64" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24 rounded-xl" />
                <Skeleton className="h-10 w-24 rounded-xl" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
              <Skeleton className="h-32 rounded-xl" />
            </div>
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
          <Link to="/dashboard/transactions">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft size={16} />
              Back to Transactions
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { type, category, amount, description, date, userEmail, userName } =
    transaction;
  const isIncome = type === "Income" || type === "income";
  const categoryTotal = calculateCategoryTotal();

  return (
    <div className="pt-24 pb-12">
      <div className="container-tight">
        {/* Back Link */}
        <Link
          to="/dashboard/transactions"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back to Transactions
        </Link>

        {/* Main Card */}
        <div className="card-base p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                <FileText size={14} />
                <span>Transaction Details</span>
              </div>
              <h1 className="text-2xl font-bold font-outfit">{category}</h1>
            </div>
            <div className="flex gap-2">
              <Link to={`/dashboard/update-transaction/${id}`}>
                <Button variant="outline" className="rounded-xl">
                  <Edit size={16} />
                  Edit
                </Button>
              </Link>
              <Button
                variant="outline"
                className="rounded-xl text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amount */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  isIncome ? "bg-green-500/10" : "bg-red-500/10"
                }`}
              >
                {isIncome ? (
                  <TrendingUp className="text-green-500" size={28} />
                ) : (
                  <TrendingDown className="text-red-500" size={28} />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p
                  className={`text-2xl font-bold ${
                    isIncome ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isIncome ? "+" : "-"}${amount.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Type */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Tag className="text-primary" size={28} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="text-xl font-semibold capitalize">{type}</p>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                <DollarSign className="text-secondary" size={28} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="text-xl font-semibold">{category}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <Calendar className="text-accent" size={28} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="text-xl font-semibold">
                  {format(new Date(date), "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border/50">
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="font-medium">{description}</p>
            </div>
          )}

          {/* Footer Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-border">
            {/* Category Total */}
            <div className="p-4 rounded-xl border border-border bg-linear-to-br from-primary/5 to-secondary/5">
              <p className="text-sm text-muted-foreground mb-1">
                Total in "{category}"
              </p>
              <p
                className={`text-2xl font-bold ${
                  isIncome ? "text-green-500" : "text-red-500"
                }`}
              >
                ${categoryTotal.toFixed(2)}
              </p>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/30">
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center">
                <User className="text-muted-foreground" size={24} />
              </div>
              <div>
                <p className="font-medium">{userName}</p>
                <p className="text-sm text-muted-foreground">{userEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
