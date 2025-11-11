import React from "react";
import { format } from "date-fns";
import { DollarSign, Calendar, Tag, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "../ui/button";


const TransactionCard = ({ transaction, onView, onEdit, onDelete }) => {
  const { type, category, amount, description, date } = transaction;

  const isIncome = type === "Income";

  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isIncome
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            <Tag size={16} />
          </div>
          <div>
            <h3 className="font-medium">{category}</h3>
            <p className="text-sm text-muted-foreground">{type}</p>
          </div>
        </div>
        <div
          className={`text-lg font-bold ${
            isIncome ? "text-green-600" : "text-red-600"
          }`}
        >
          {isIncome ? "+" : "-"}${amount.toFixed(2)}
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
        <Calendar size={14} />
        <span>{format(new Date(date), "MMM dd, yyyy")}</span>
      </div>

      {description && (
        <p className="text-sm mb-3 line-clamp-2">{description}</p>
      )}

      <div className="flex justify-end space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(transaction._id)}
        >
          <Eye size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(transaction._id)}
        >
          <Edit size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(transaction._id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TransactionCard;
