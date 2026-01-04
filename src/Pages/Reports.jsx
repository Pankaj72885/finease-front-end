import CategoryChart from "@/components/reports/CategoryChart";
import MonthlyChart from "@/components/reports/MonthlyChart";
import SummaryCards from "@/components/reports/SummaryCards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/Contexts/AuthContext";
import { useMonthlyData, useReports } from "@/Hooks/useReports";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";
import { useState } from "react";

const Reports = () => {
  const { currentUser } = useAuth();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const { summary, categoryData } = useReports(currentUser?.email);
  const { monthlyData, isLoading: monthlyLoading } = useMonthlyData(
    currentUser?.email,
    selectedYear
  );

  const years = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <div className="pt-24 pb-12">
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

          {/* Year Filter */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar size={18} />
              <span className="text-sm font-medium">Year:</span>
            </div>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px] rounded-xl">
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
        </div>

        {/* Summary Cards */}
        <div className="mb-8">
          <SummaryCards summary={summary} />
        </div>

        {/* Charts Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-primary" />
            <h2 className="text-xl font-semibold font-outfit">
              Detailed Breakdown
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-base p-6">
            <h3 className="text-lg font-semibold mb-4">By Category</h3>
            <CategoryChart data={categoryData} />
          </div>
          <div className="card-base p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Trend</h3>
            <MonthlyChart data={monthlyData} isLoading={monthlyLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
