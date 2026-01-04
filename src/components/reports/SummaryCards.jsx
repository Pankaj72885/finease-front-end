import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

const SummaryCards = ({ summary }) => {
  const { totalIncome = 0, totalExpense = 0, balance = 0 } = summary || {};

  const cards = [
    {
      title: "Total Income",
      value: totalIncome,
      change: "+12.5%",
      changeType: "positive",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
    },
    {
      title: "Total Expenses",
      value: totalExpense,
      change: "-8.2%",
      changeType: "negative",
      icon: TrendingDown,
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-500/10 to-rose-500/10",
    },
    {
      title: "Net Balance",
      value: balance,
      change: balance >= 0 ? "Positive" : "Deficit",
      changeType: balance >= 0 ? "positive" : "negative",
      icon: Wallet,
      gradient: "from-primary to-secondary",
      bgGradient: "from-primary/10 to-secondary/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${card.bgGradient} p-6 border border-border`}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div
                className={`w-full h-full rounded-full bg-linear-to-br ${card.gradient} blur-2xl`}
              />
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${card.gradient} flex items-center justify-center mb-4 shadow-lg`}
              >
                <Icon size={24} className="text-white" />
              </div>

              {/* Title */}
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {card.title}
              </p>

              {/* Value */}
              <p className="text-3xl font-bold mb-2">
                $
                {Math.abs(card.value).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              {/* Change Indicator */}
              <div
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  card.changeType === "positive"
                    ? "bg-green-500/20 text-green-600 dark:text-green-400"
                    : "bg-red-500/20 text-red-600 dark:text-red-400"
                }`}
              >
                {card.changeType === "positive" ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {card.change}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
