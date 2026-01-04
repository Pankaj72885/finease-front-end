import {
  ChartSkeleton,
  SummaryCardSkeleton,
} from "@/components/Common/Skeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Contexts/AuthContext";
import { useMonthlyData, useReports } from "@/Hooks/useReports";
import { useTransactions } from "@/Hooks/useTransactions";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  FileText,
  Plus,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link } from "react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#8b5cf6", "#06b6d4", "#ec4899", "#10b981", "#f59e0b"];

const DashboardOverview = () => {
  const { currentUser } = useAuth();
  const currentYear = new Date().getFullYear();

  const { summary, categoryData, isLoading } = useReports(currentUser?.email);
  const { monthlyData, isLoading: monthlyLoading } = useMonthlyData(
    currentUser?.email,
    currentYear.toString()
  );
  const { transactions, isLoading: transactionsLoading } = useTransactions(
    currentUser?.email,
    "date",
    "desc"
  );

  // Get recent transactions (last 5)
  const recentTransactions = transactions?.slice(0, 5) || [];

  // Transform category data for pie chart
  const pieChartData = Object.entries(categoryData || {})
    .map(([name, values]) => ({
      name,
      value: values.expense,
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const totalPie = pieChartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-outfit">
            Welcome back, {currentUser?.displayName?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your financial overview for {currentYear}
          </p>
        </div>
        <Link to="/dashboard/add-transaction">
          <Button className="rounded-xl bg-gradient-primary hover:opacity-90">
            <Plus size={18} />
            Add Transaction
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCardSkeleton />
          <SummaryCardSkeleton />
          <SummaryCardSkeleton />
          <SummaryCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Income */}
          <div className="card-base p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500 font-medium flex items-center gap-1">
                <ArrowUpRight size={12} />
                Income
              </span>
            </div>
            <p className="text-2xl font-bold">
              ${(summary?.totalIncome || 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Total Income</p>
          </div>

          {/* Total Expenses */}
          <div className="card-base p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <TrendingDown className="text-red-500" size={20} />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-500 font-medium">
                Expenses
              </span>
            </div>
            <p className="text-2xl font-bold">
              ${(summary?.totalExpense || 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Total Expenses</p>
          </div>

          {/* Balance */}
          <div className="card-base p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="text-primary" size={20} />
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  (summary?.balance || 0) >= 0
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {(summary?.balance || 0) >= 0 ? "Positive" : "Deficit"}
              </span>
            </div>
            <p className="text-2xl font-bold">
              ${Math.abs(summary?.balance || 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Net Balance</p>
          </div>

          {/* Transactions Count */}
          <div className="card-base p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <FileText className="text-secondary" size={20} />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary font-medium">
                Total
              </span>
            </div>
            <p className="text-2xl font-bold">{transactions?.length || 0}</p>
            <p className="text-sm text-muted-foreground mt-1">Transactions</p>
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Bar Chart */}
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 size={20} className="text-primary" />
              <h3 className="font-semibold">Monthly Trend</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar size={14} />
              <span>{currentYear}</span>
            </div>
          </div>
          {monthlyLoading ? (
            <ChartSkeleton />
          ) : monthlyData && monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v}`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.75rem",
                  }}
                />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              No data available
            </div>
          )}
        </div>

        {/* Category Pie Chart */}
        <div className="card-base p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-gradient-primary" />
              <h3 className="font-semibold">Expense Categories</h3>
            </div>
            <Link
              to="/dashboard/reports"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View Details <ArrowRight size={12} />
            </Link>
          </div>
          {isLoading ? (
            <ChartSkeleton />
          ) : pieChartData.length > 0 ? (
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieChartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "0.75rem",
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full lg:w-auto space-y-2">
                {pieChartData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm truncate max-w-[100px]">
                      {item.name}
                    </span>
                    <span className="text-sm text-muted-foreground ml-auto">
                      {((item.value / totalPie) * 100).toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              No expense data
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="card-base p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-secondary" />
            <h3 className="font-semibold">Recent Transactions</h3>
          </div>
          <Link
            to="/dashboard/transactions"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {transactionsLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex items-center gap-4 py-3"
              >
                <div className="w-10 h-10 bg-muted rounded-xl" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/4" />
                </div>
                <div className="h-5 bg-muted rounded w-20" />
              </div>
            ))}
          </div>
        ) : recentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Category
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            tx.type?.toLowerCase() === "income"
                              ? "bg-green-500/10"
                              : "bg-red-500/10"
                          }`}
                        >
                          {tx.type?.toLowerCase() === "income" ? (
                            <TrendingUp className="text-green-500" size={18} />
                          ) : (
                            <TrendingDown className="text-red-500" size={18} />
                          )}
                        </div>
                        <span className="font-medium">{tx.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          tx.type?.toLowerCase() === "income"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-red-500/10 text-red-600"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground text-sm hidden sm:table-cell">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span
                        className={`font-semibold ${
                          tx.type?.toLowerCase() === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {tx.type?.toLowerCase() === "income" ? "+" : "-"}$
                        {tx.amount?.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <FileText size={40} className="mx-auto mb-4 opacity-50" />
            <p>No transactions yet</p>
            <Link
              to="/dashboard/add-transaction"
              className="text-primary hover:underline mt-2 inline-block"
            >
              Add your first transaction
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
