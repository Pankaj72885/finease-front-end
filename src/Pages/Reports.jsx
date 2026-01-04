import {
  ChartSkeleton,
  SummaryCardSkeleton,
} from "@/components/Common/Skeleton";
import CategoryChart from "@/components/reports/CategoryChart";
import MonthlyChart from "@/components/reports/MonthlyChart";
import SummaryCards from "@/components/reports/SummaryCards";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/Contexts/AuthContext";
import { useMonthlyData, useReports } from "@/Hooks/useReports";
import {
  BarChart3,
  Calendar,
  Download,
  PieChart,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const Reports = () => {
  const { currentUser } = useAuth();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const { summary, categoryData, isLoading } = useReports(currentUser?.email);
  const { monthlyData, isLoading: monthlyLoading } = useMonthlyData(
    currentUser?.email,
    selectedYear
  );

  const years = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <div className="pb-12">
      <div className="container-wide">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              <BarChart3 size={14} />
              <span>Analytics</span>
            </div>
            <h1 className="text-3xl font-bold font-outfit">
              Financial Reports
            </h1>
            <p className="text-muted-foreground mt-1">
              Visualize your spending patterns and financial health
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Year Filter */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={18} />
                <span className="text-sm font-medium hidden sm:inline">
                  Year:
                </span>
              </div>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger
                  className="w-[100px] rounded-xl"
                  aria-label="Select year"
                >
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Export Button (Future Feature) */}
            <Button
              variant="outline"
              className="rounded-xl"
              disabled
              title="Coming soon"
              aria-label="Export report"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
              <SummaryCardSkeleton />
            </div>
          ) : (
            <SummaryCards summary={summary} />
          )}
        </div>

        {/* Charts Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            <h2 className="text-xl font-semibold font-outfit">
              Detailed Breakdown
            </h2>
          </div>
          <span className="text-sm text-muted-foreground">
            Data for {selectedYear}
          </span>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Chart */}
          <div className="card-base p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart size={20} className="text-secondary" />
              <h3 className="text-lg font-semibold">Expense by Category</h3>
            </div>
            {isLoading ? (
              <ChartSkeleton />
            ) : (
              <CategoryChart data={categoryData} />
            )}
          </div>

          {/* Monthly Chart */}
          <div className="card-base p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={20} className="text-primary" />
              <h3 className="text-lg font-semibold">Monthly Trend</h3>
            </div>
            {monthlyLoading ? (
              <ChartSkeleton />
            ) : (
              <MonthlyChart data={monthlyData} isLoading={monthlyLoading} />
            )}
          </div>
        </div>

        {/* Insights Section */}
        <div className="mt-8 card-base p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Quick Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-background border border-border">
              <p className="text-sm text-muted-foreground mb-1">
                Highest Expense Category
              </p>
              <p className="font-semibold">
                {categoryData
                  ? Object.entries(categoryData)
                      .filter(([, v]) => v.expense > 0)
                      .sort((a, b) => b[1].expense - a[1].expense)[0]?.[0] ||
                    "No data"
                  : "Loading..."}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border">
              <p className="text-sm text-muted-foreground mb-1">
                Average Monthly Expense
              </p>
              <p className="font-semibold">
                $
                {monthlyData
                  ? (
                      monthlyData.reduce((sum, m) => sum + m.expense, 0) /
                      (monthlyData.filter((m) => m.expense > 0).length || 1)
                    ).toLocaleString(undefined, { maximumFractionDigits: 0 })
                  : "0"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border">
              <p className="text-sm text-muted-foreground mb-1">Savings Rate</p>
              <p className="font-semibold">
                {summary?.totalIncome > 0
                  ? `${Math.round(
                      ((summary.totalIncome - summary.totalExpense) /
                        summary.totalIncome) *
                        100
                    )}%`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
