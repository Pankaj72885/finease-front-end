// Query key factory for TanStack Query
export const queryKeys = {
  // Auth
  auth: ["auth"],

  // Transactions
  transactions: ["transactions"],
  transaction: (id) => ["transactions", id],
  transactionsByUser: (email, sortBy, sortOrder) => [
    "transactions",
    email,
    sortBy,
    sortOrder,
  ],

  // Reports
  reports: ["reports"],
  summary: (email) => ["reports", "summary", email],
  categoryBreakdown: (email) => ["reports", "category", email],
  monthlyData: (email, year) => ["reports", "monthly", email, year],
};
