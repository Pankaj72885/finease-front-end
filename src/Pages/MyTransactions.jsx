import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import TransactionCard from "@/components/transactions/TransactionCard";
import { ArrowUpDown, ArrowUp, ArrowDown, Filter } from "lucide-react";
import Swal from "sweetalert2";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/Contexts/AuthContext";
import { useTransactions } from "@/Hooks/useTransactions";

const MyTransactions = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { transactions, isLoading, deleteTransaction } =
    useTransactions(currentUser?.email, sortBy, sortOrder);

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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
        className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Transactions</h1>
        <Link to="/add-transaction">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors cursor-pointer">
            Add Transaction
          </button>
        </Link>
      </div>

      {/* Sort Controls */}
      <div className="flex flex-wrap gap-2 mb-6">
        <SortButton field="date" label="Date" />
        <SortButton field="amount" label="Amount" />
        <SortButton field="category" label="Category" />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : transactions?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="text-center py-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Filter size={24} className="text-gray-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
          <p className="text-muted-foreground mb-6">
            Add your first transaction to get started
          </p>
          <Link to="/add-transaction">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors cursor-pointer">
              Add Transaction
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyTransactions;
