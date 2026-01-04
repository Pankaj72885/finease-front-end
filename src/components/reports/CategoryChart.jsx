import { PieChart as PieChartIcon } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#ec4899", // Pink
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#84cc16", // Lime
  "#6366f1", // Indigo
  "#14b8a6", // Teal
];

const CategoryChart = ({ data }) => {
  // Transform data for the chart
  const chartData = Object.entries(data || {})
    .map(([category, values]) => ({
      name: category,
      value: values.expense,
    }))
    .filter((entry) => entry.value > 0)
    .sort((a, b) => b.value - a.value);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="bg-card border border-border rounded-xl shadow-lg p-3">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-lg font-bold text-primary">
            $
            {payload[0].value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="text-sm text-muted-foreground">
            {percentage}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (percent < 0.05) return null;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="h-full">
      {chartData.length > 0 ? (
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Chart */}
          <div className="w-full lg:w-1/2">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={100}
                  innerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="w-full lg:w-1/2 space-y-2">
            {chartData.slice(0, 6).map((item, index) => {
              const percentage = ((item.value / total) * 100).toFixed(1);
              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {item.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      ${item.value.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {percentage}%
                    </p>
                  </div>
                </div>
              );
            })}
            {chartData.length > 6 && (
              <p className="text-xs text-muted-foreground text-center pt-2">
                +{chartData.length - 6} more categories
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <PieChartIcon size={48} className="mb-4 opacity-50" />
          <p>No expense data available</p>
          <p className="text-sm">Start adding transactions to see insights</p>
        </div>
      )}
    </div>
  );
};

export default CategoryChart;
