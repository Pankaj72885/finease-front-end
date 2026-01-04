import { format } from "date-fns";
import {
  Calendar,
  Edit,
  Eye,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const TransactionCard = ({ transaction, onView, onEdit, onDelete }) => {
  const { type, category, amount, description, date } = transaction;
  const [showActions, setShowActions] = useState(false);

  const isIncome = type === "Income" || type === "income";

  // Category icons/colors mapping
  const getCategoryStyle = () => {
    const categories = {
      Salary: { bg: "bg-green-500/10", text: "text-green-500" },
      Freelance: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
      Investment: { bg: "bg-blue-500/10", text: "text-blue-500" },
      Food: { bg: "bg-orange-500/10", text: "text-orange-500" },
      Transport: { bg: "bg-purple-500/10", text: "text-purple-500" },
      Shopping: { bg: "bg-pink-500/10", text: "text-pink-500" },
      Entertainment: { bg: "bg-yellow-500/10", text: "text-yellow-500" },
      Bills: { bg: "bg-red-500/10", text: "text-red-500" },
      Healthcare: { bg: "bg-cyan-500/10", text: "text-cyan-500" },
      Education: { bg: "bg-indigo-500/10", text: "text-indigo-500" },
      Other: { bg: "bg-gray-500/10", text: "text-gray-500" },
    };
    return categories[category] || categories.Other;
  };

  const categoryStyle = getCategoryStyle();

  return (
    <div className="group card-base p-5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header Row */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Type Icon */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isIncome ? "bg-green-500/10" : "bg-red-500/10"
            }`}
          >
            {isIncome ? (
              <TrendingUp className="text-green-500" size={24} />
            ) : (
              <TrendingDown className="text-red-500" size={24} />
            )}
          </div>

          {/* Category & Type */}
          <div>
            <h3 className="font-semibold text-foreground">{category}</h3>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text}`}
            >
              {type}
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="text-right">
          <p
            className={`text-xl font-bold ${
              isIncome ? "text-green-500" : "text-red-500"
            }`}
          >
            {isIncome ? "+" : "-"}$
            {amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Calendar size={14} />
        <span>{format(new Date(date), "MMMM dd, yyyy")}</span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 bg-muted/50 p-3 rounded-lg">
          {description}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(transaction._id)}
            className="rounded-lg hover:bg-primary/10 hover:text-primary"
          >
            <Eye size={16} />
            <span className="ml-1 hidden sm:inline">View</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(transaction._id)}
            className="rounded-lg hover:bg-secondary/10 hover:text-secondary"
          >
            <Edit size={16} />
            <span className="ml-1 hidden sm:inline">Edit</span>
          </Button>
        </div>

        {/* Delete with confirmation */}
        <div className="relative">
          {showActions ? (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
              <span className="text-xs text-muted-foreground">Delete?</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActions(false)}
                className="rounded-lg h-8 px-2"
              >
                No
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  onDelete(transaction._id);
                  setShowActions(false);
                }}
                className="rounded-lg h-8 px-3"
              >
                Yes
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(true)}
              className="rounded-lg hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
