import { useAuth } from "@/Contexts/AuthContext";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  DollarSign,
  FileText,
  Loader2,
  Sparkles,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const incomeCategories = [
  { value: "Salary", icon: "💼" },
  { value: "Freelance", icon: "💻" },
  { value: "Investment", icon: "📈" },
  { value: "Business", icon: "🏢" },
  { value: "Gift", icon: "🎁" },
  { value: "Pocket Money", icon: "👛" },
  { value: "Other Income", icon: "💰" },
];

const expenseCategories = [
  { value: "Food & Dining", icon: "🍔" },
  { value: "Transportation", icon: "🚗" },
  { value: "Shopping", icon: "🛍️" },
  { value: "Entertainment", icon: "🎬" },
  { value: "Bills & Utilities", icon: "📱" },
  { value: "Healthcare", icon: "🏥" },
  { value: "Education", icon: "📚" },
  { value: "Travel", icon: "✈️" },
  { value: "Other Expense", icon: "📋" },
];

const TransactionForm = ({
  initialData,
  onSubmit,
  isEditing = false,
  isSubmitting = false,
}) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    type: "Expense",
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    userEmail: currentUser?.email || "",
    userName: currentUser?.displayName || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: new Date(initialData.date).toISOString().split("T")[0],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value, category: "" }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.category || !formData.amount || !formData.date) {
      return;
    }

    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });

    if (!isEditing) {
      setFormData({
        type: "Expense",
        category: "",
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        userEmail: currentUser?.email || "",
        userName: currentUser?.displayName || "",
      });
    }
  };

  const categories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Transaction Type Toggle */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Transaction Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleTypeChange("Income")}
            className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
              formData.type === "Income"
                ? "border-green-500 bg-green-500/10 text-green-600"
                : "border-border hover:border-green-500/50 hover:bg-green-500/5"
            }`}
          >
            <ArrowUpCircle
              size={24}
              className={
                formData.type === "Income"
                  ? "text-green-500"
                  : "text-muted-foreground"
              }
            />
            <span className="font-medium">Income</span>
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("Expense")}
            className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
              formData.type === "Expense"
                ? "border-red-500 bg-red-500/10 text-red-600"
                : "border-border hover:border-red-500/50 hover:bg-red-500/5"
            }`}
          >
            <ArrowDownCircle
              size={24}
              className={
                formData.type === "Expense"
                  ? "text-red-500"
                  : "text-muted-foreground"
              }
            />
            <span className="font-medium">Expense</span>
          </button>
        </div>
      </div>

      {/* Amount - Prominent */}
      <div>
        <label className="block text-sm font-medium mb-3">Amount</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <DollarSign size={20} className="text-muted-foreground" />
          </div>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            className="pl-12 h-14 text-2xl font-bold rounded-xl"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      {/* Category & Date Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-3 flex items-center gap-2">
            <Tag size={16} className="text-muted-foreground" />
            Category
          </label>
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  <span className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.value}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3 flex items-center gap-2">
            <Calendar size={16} className="text-muted-foreground" />
            Date
          </label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="h-12 rounded-xl"
            required
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-3 flex items-center gap-2">
          <FileText size={16} className="text-muted-foreground" />
          Description
          <span className="text-xs text-muted-foreground">(optional)</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add a note about this transaction..."
          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      {/* User Info - Collapsed */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground mb-2">Recording as:</p>
        <div className="flex items-center gap-3">
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {currentUser?.displayName?.charAt(0) || "U"}
              </span>
            </div>
          )}
          <div>
            <p className="text-sm font-medium">{formData.userName || "User"}</p>
            <p className="text-xs text-muted-foreground">
              {formData.userEmail}
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !formData.category || !formData.amount}
        className={`w-full h-14 rounded-xl text-lg font-semibold transition-all ${
          formData.type === "Income"
            ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90"
            : "bg-gradient-primary hover:opacity-90"
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 size={20} className="animate-spin" />
            {isEditing ? "Updating..." : "Adding..."}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles size={20} />
            {isEditing ? "Update Transaction" : "Add Transaction"}
          </span>
        )}
      </Button>
    </form>
  );
};

export default TransactionForm;
