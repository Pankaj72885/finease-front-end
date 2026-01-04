import { BarChart3 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Spinner } from "../ui/spinner";

const MonthlyChart = ({ data, isLoading }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-xl shadow-lg p-4">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm">{entry.name}:</span>
              <span className="text-sm font-semibold">
                $
                {entry.value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
          {payload.length >= 2 && (
            <div className="mt-2 pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">Net: </span>
              <span
                className={`text-sm font-bold ${
                  payload[0].value - payload[1].value >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                $
                {(payload[0].value - payload[1].value).toLocaleString(
                  undefined,
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => (
    <div className="flex items-center justify-center gap-6 mt-4">
      {payload?.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-full">
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Legend content={<CustomLegend />} />
            <Bar
              dataKey="income"
              fill="url(#incomeGradient)"
              name="Income"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="expense"
              fill="url(#expenseGradient)"
              name="Expense"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <BarChart3 size={48} className="mb-4 opacity-50" />
          <p>No monthly data available</p>
          <p className="text-sm">Data will appear once you add transactions</p>
        </div>
      )}
    </div>
  );
};

export default MonthlyChart;
