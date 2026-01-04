import TransactionCard from "@/components/transactions/TransactionCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/Contexts/AuthContext";
import { useTransactions } from "@/Hooks/useTransactions";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Filter,
  LayoutDashboard,
  Plus,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyTransactions = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { transactions, isLoading, deleteTransaction } = useTransactions(
    currentUser?.email,
    sortBy,
    sortOrder
  );

  // Calculate summary stats
  const totalIncome =
    transactions
      ?.filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0) || 0;

  const totalExpense =
    transactions
      ?.filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0) || 0;

  const balance = totalIncome - totalExpense;

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f3f4f6"
        : "#1f2937",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTransaction(id);
      }
    });
  };

  const SortButton = ({ field, label }) => {
    const isActive = sortBy === field;
    const isAsc = isActive && sortOrder === "asc";

    return (
      <button
        onClick={() => handleSort(field)}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
        }`}
      >
        <span>{label}</span>
        {isActive ? (
          isAsc ? (
            <ArrowUp size={14} />
          ) : (
            <ArrowDown size={14} />
          )
        ) : (
          <ArrowUpDown size={14} />
        )}
      </button>
    );
  };

  return (
    <div className="pt-24 pb-12">
      <div className="container-wide">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              <LayoutDashboard size={14} />
              <span>Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold font-outfit">My Transactions</h1>
          </div>
          <Link to="/add-transaction">
            <Button className="rounded-xl bg-gradient-primary hover:opacity-90 transition-all">
              <Plus size={18} />
              Add Transaction
            </Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="card-base p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="text-green-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-xl font-bold text-green-500">
                ${totalIncome.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="card-base p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="text-red-500" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-xl font-bold text-red-500">
                ${totalExpense.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="card-base p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p
                className={`text-xl font-bold ${
                  balance >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                ${Math.abs(balance).toLocaleString()}
                {balance < 0 && " (deficit)"}
              </p>
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
          <SortButton field="date" label="Date" />
          <SortButton field="amount" label="Amount" />
          <SortButton field="category" label="Category" />
        </div>

        {/* Transactions Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : transactions?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction._id}
                transaction={transaction}
                onView={(id) => navigate(`/transaction/${id}`)}
                onEdit={(id) => navigate(`/update-transaction/${id}`)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <Filter size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No transactions yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Start tracking your finances by adding your first transaction
            </p>
            <Link to="/add-transaction">
              <Button className="rounded-xl bg-gradient-primary hover:opacity-90">
                <Plus size={18} />
                Add Your First Transaction
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTransactions;
