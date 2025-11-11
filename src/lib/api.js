import { auth } from "./firebase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Generic fetch wrapper for TanStack Query

export const apiRequest = async (endpoint, options = {}) => {
  let token = null;
  if (auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken();
    } catch (error) {
      console.error("Error getting auth token:", error);
    }
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...config,
    body: config.body ? JSON.stringify(config.body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  // Handle no-content responses (like DELETE)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return {}; // Return an empty object for 200 OK responses with no body
};

// Auth API
export const authAPI = {
  verifyToken: (idToken) =>
    apiRequest("/auth/verify-token", {
      method: "POST",
      body: { idToken },
    }),
};

// Transaction API
export const transactionAPI = {
  getAll: (userEmail, sortBy, sortOrder) =>
    apiRequest(
      `/transactions?userEmail=${userEmail}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    ),

  getById: (id) => apiRequest(`/transactions/${id}`),

  create: (transactionData) =>
    apiRequest("/transactions", {
      method: "POST",
      body: transactionData,
    }),

  update: (id, transactionData) =>
    apiRequest(`/transactions/${id}`, {
      method: "PUT",
      body: transactionData,
    }),

  delete: (id) =>
    apiRequest(`/transactions/${id}`, {
      method: "DELETE",
    }),
};

// Reports API
export const reportsAPI = {
  getSummary: (userEmail) =>
    apiRequest(`/reports/summary?userEmail=${userEmail}`),

  getCategoryBreakdown: (userEmail) =>
    apiRequest(`/reports/by-category?userEmail=${userEmail}`),

  getMonthlyData: (userEmail, year) =>
    apiRequest(`/reports/monthly?userEmail=${userEmail}&year=${year}`),
};
