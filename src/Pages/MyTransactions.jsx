import EmptyState from "@/components/Common/EmptyState";
import {
  SummaryCardSkeleton,
  TransactionCardSkeleton,
} from "@/components/Common/Skeleton";
import TransactionCard from "@/components/transactions/TransactionCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/Contexts/AuthContext";
import { useTransactions } from "@/Hooks/useTransactions";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  FileText,
  Filter,
  LayoutDashboard,
  Plus,
  Search,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const { transactions, isLoading, deleteTransaction } = useTransactions(
    currentUser?.email,
    sortBy,
    sortOrder
  );

  // Filter transactions
  const filteredTransactions = transactions?.filter((t) => {
    // 1. Filter by Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        t.category?.toLowerCase().includes(query) ||
        t.description?.toLowerCase().includes(query) ||
        t.type?.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // 2. Filter by Type (Income/Expense/All)
    if (filterType !== "all") {
      if (t.type?.toLowerCase() !== filterType.toLowerCase()) return false;
    }

    return true;
  });

  // Calculate summary stats
  const totalIncome =
    transactions
      ?.filter((t) => t.type?.toLowerCase() === "income")
      .reduce((sum, t) => sum + t.amount, 0) || 0;

  const totalExpense =
    transactions
      ?.filter((t) => t.type?.toLowerCase() === "expense")
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
        aria-label={`Sort by ${label}`}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
    <div className="pb-12">
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
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
            <SummaryCardSkeleton />
          </div>
        ) : (
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
        )}

        {/* Search & Filter & Sort Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              aria-label="Search transactions"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Filter Dropdown */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter size={16} />
                <span className="text-sm font-medium hidden sm:inline">
                  Type:
                </span>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[130px] rounded-xl h-11">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income Only</SelectItem>
                  <SelectItem value="expense">Expense Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2 bg-card border border-border p-1.5 rounded-xl h-11">
              <span className="text-xs text-muted-foreground px-2">Sort:</span>
              <SortButton field="date" label="Date" />
              <SortButton field="amount" label="Amt" />
              <SortButton field="category" label="Cat" />
            </div>
          </div>
        </div>

        {/* Transactions Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <TransactionCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredTransactions?.length > 0 ? (
          <>
            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredTransactions.length} of {transactions?.length}{" "}
              transactions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTransactions.map((transaction) => (
                <TransactionCard
                  key={transaction._id}
                  transaction={transaction}
                  onView={(id) => navigate(`/transaction/${id}`)}
                  onEdit={(id) => navigate(`/update-transaction/${id}`)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        ) : searchQuery || filterType !== "all" ? (
          // No results from search/filter
          <EmptyState
            icon={Search}
            title="No matching transactions"
            description={`No transactions found matching your filters. Try adjusting your search term or filter.`}
            actionLabel="Reset Filters"
            onAction={() => {
              setSearchQuery("");
              setFilterType("all");
            }}
          />
        ) : (
          // Empty state - no transactions at all
          <EmptyState
            icon={FileText}
            title="No transactions yet"
            description="Start tracking your finances by adding your first transaction. It only takes a few seconds!"
            actionLabel="Add Your First Transaction"
            actionLink="/add-transaction"
          />
        )}
      </div>
    </div>
  );
};

export default MyTransactions;
