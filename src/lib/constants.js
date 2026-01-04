/**
 * Application Constants
 * Centralized place for all constant values
 */

// Transaction Types
export const TRANSACTION_TYPES = ["Income", "Expense"];

// Income Categories with icons
export const INCOME_CATEGORIES = [
  { value: "Salary", icon: "💼", color: "green" },
  { value: "Freelance", icon: "💻", color: "emerald" },
  { value: "Investment", icon: "📈", color: "blue" },
  { value: "Business", icon: "🏢", color: "purple" },
  { value: "Gift", icon: "🎁", color: "pink" },
  { value: "Pocket Money", icon: "👛", color: "yellow" },
  { value: "Other Income", icon: "💰", color: "gray" },
];

// Expense Categories with icons
export const EXPENSE_CATEGORIES = [
  { value: "Food & Dining", icon: "🍔", color: "orange" },
  { value: "Transportation", icon: "🚗", color: "purple" },
  { value: "Shopping", icon: "🛍️", color: "pink" },
  { value: "Entertainment", icon: "🎬", color: "yellow" },
  { value: "Bills & Utilities", icon: "📱", color: "red" },
  { value: "Healthcare", icon: "🏥", color: "cyan" },
  { value: "Education", icon: "📚", color: "indigo" },
  { value: "Travel", icon: "✈️", color: "blue" },
  { value: "Other Expense", icon: "📋", color: "gray" },
];

// All Categories (for filters)
export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

// Sort Options
export const SORT_OPTIONS = [
  { value: "date", label: "Date" },
  { value: "amount", label: "Amount" },
  { value: "category", label: "Category" },
];

export const SORT_ORDERS = [
  { value: "desc", label: "Newest First" },
  { value: "asc", label: "Oldest First" },
];

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

// Date Formats
export const DATE_FORMAT = {
  display: "MMMM dd, yyyy",
  short: "MMM dd, yyyy",
  input: "yyyy-MM-dd",
};

// Chart Colors
export const CHART_COLORS = [
  "#8b5cf6", // Purple (Primary)
  "#06b6d4", // Cyan (Secondary)
  "#ec4899", // Pink (Accent)
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#3b82f6", // Blue
  "#84cc16", // Lime
  "#6366f1", // Indigo
  "#14b8a6", // Teal
];

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    verifyToken: "/auth/verify-token",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  transactions: {
    base: "/transactions",
    byId: (id) => `/transactions/${id}`,
  },
  reports: {
    summary: "/reports/summary",
    byCategory: "/reports/by-category",
    monthly: "/reports/monthly",
  },
};

// Social Links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com",
  instagram: "https://instagram.com",
};

// Contact Info
export const CONTACT_INFO = {
  email: "support@finease.com",
  phone: "+1 (555) 123-4567",
  address: "123 Finance Street, Money City, MC 12345",
};

// Feature Flags
export const FEATURES = {
  enableDarkMode: true,
  enableNotifications: false,
  enableExport: false,
  enableRecurringTransactions: false,
  enableBudgets: false,
};
