# 💰 FinEase - Personal Finance Management Platform

<div align="center">

![FinEase Banner](https://img.shields.io/badge/FinEase-Personal_Finance_Manager-8b5cf6?style=for-the-badge&logo=react&logoColor=white)

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-06b6d4?style=for-the-badge)](https://finease-font-end.vercel.app/)
[![Backend Repo](https://img.shields.io/badge/📦_Backend-Repository-ec4899?style=for-the-badge)](https://github.com/Pankaj72885/finease-back-end)

**A full-stack personal finance management application with real-time analytics, interactive dashboards, and comprehensive transaction tracking.**

[Features](#-features) • [Tech Stack](#️-tech-stack) • [Screenshots](#-screenshots) • [Challenges](#-challenges-faced--technical-solutions) • [Setup](#-local-setup)

</div>

---

## 📋 Overview

**FinEase** is a modern, full-stack personal finance management platform designed to help users track income, expenses, and gain insights into their spending patterns through intuitive visualizations and analytics.

Built with React 19, Node.js/Express, and MongoDB, this project showcases:

- 🏗️ Modern React architecture with hooks and context
- 🔐 Secure authentication with Firebase
- 📊 Real-time data visualization with Recharts
- 🎨 Premium UI/UX with glassmorphism and micro-animations
- ⚡ Optimized performance with code splitting

---

## ✨ Features

### 🔐 Authentication & Authorization

- **Email/Password Registration & Login** with validation
- **Google OAuth Integration** for social login
- **Demo User Access** - One-click test credentials for easy exploration
- **Protected Routes** with role-based access control
- **Persistent Sessions** with secure token management

### 💸 Transaction Management (Full CRUD)

- **Add Transactions** - Record income/expenses with categories
- **Edit & Update** - Modify transaction details anytime
- **Delete with Confirmation** - Safe deletion with warning prompts
- **View Details** - Complete transaction information display
- **Smart Categorization** - Pre-defined categories with emoji icons

### 📊 Analytics & Reports Dashboard

- **Summary Cards** - Income, expenses, balance at a glance
- **Monthly Trend Chart** - Bar chart showing monthly income vs expenses
- **Category Breakdown** - Pie chart with expense distribution
- **Recent Transactions Table** - Quick view of latest activities
- **Quick Insights** - Savings rate, highest category, averages

### 🎨 Modern UI/UX

- **Glassmorphism Design** - Modern frosted glass effects
- **Dark/Light Mode** - Full theme support with smooth transitions
- **Responsive Design** - Mobile-first, optimized for all devices
- **Micro-animations** - Subtle animations for enhanced UX
- **Skeleton Loaders** - Smooth loading states throughout

### 🧭 Navigation & Structure

- **Public Pages** - Home, Features, Pricing, Blog, About, Contact, FAQ
- **Dashboard Layout** - Dedicated sidebar navigation for authenticated users
- **Dropdown Menus** - Profile and dashboard quick access
- **Breadcrumb Navigation** - Clear path indication

---

## 🏗️ Tech Stack

### Frontend

| Technology         | Purpose                           |
| ------------------ | --------------------------------- |
| React 19.x         | UI Framework with latest features |
| Vite 7.x           | Fast build tool and dev server    |
| TailwindCSS 4.x    | Utility-first CSS framework       |
| shadcn/ui          | Accessible component library      |
| React Router 7.x   | Client-side routing               |
| TanStack Query 5.x | Server state management & caching |
| Recharts 3.x       | Interactive data visualization    |
| Firebase SDK 12.x  | Authentication service            |
| Lucide React       | Modern icon library               |

### Backend

| Technology         | Purpose                   |
| ------------------ | ------------------------- |
| Node.js            | JavaScript runtime        |
| Express 5.x        | Web application framework |
| MongoDB            | NoSQL database            |
| Mongoose           | MongoDB ODM               |
| Firebase Admin SDK | Token verification        |
| JWT                | Authentication tokens     |
| CORS               | Cross-origin handling     |

### DevOps & Tools

| Tool                | Purpose             |
| ------------------- | ------------------- |
| Vercel              | Frontend deployment |
| Vercel (Serverless) | Backend deployment  |
| Git & GitHub        | Version control     |
| ESLint              | Code linting        |
| Prettier            | Code formatting     |

---

## 📱 Screenshots

### Landing Page

- Modern hero section with animated gradients
- 11 comprehensive sections
- Fully responsive design

### Dashboard Overview

- Summary statistics cards
- Interactive charts (Bar & Pie)
- Recent transactions table

### Transaction Management

- Modern card-based layout
- Search and filtering
- Skeleton loading states

### Authentication

- Clean login/register forms
- Demo user quick access
- Social login integration

---

## 🚧 Challenges Faced & Technical Solutions

### Frontend Challenges

#### 1. **TailwindCSS v4 `@apply` Directive Issue**

**Problem:** Build failing with error "Cannot apply unknown utility class card-base"

**Root Cause:** TailwindCSS v4 changed how `@apply` works with custom classes defined in the same file.

**Solution:**

```css
/* Before: This failed */
.card-interactive {
  @apply card-base;
}

/* After: Inline the base styles */
.card-interactive {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  /* ... all base styles inline */
}
```

#### 2. **React Router v7 Lazy Loading**

**Problem:** Pages not loading when using `lazy()` with default exports

**Root Cause:** React Router's `lazy()` requires named export `Component`

**Solution:**

```javascript
// Before: export default HomePage
// After:
export function Component() {
  return <HomePage />;
}
Component.displayName = "HomePage";
```

#### 3. **Firebase Auth State Race Condition**

**Problem:** API calls failing because auth token not ready

**Root Cause:** Firebase `onAuthStateChanged` is async; API calls were made before auth initialized

**Solution:**

```javascript
const getAuthUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // Cleanup
        resolve(user);
      },
      reject
    );
  });
};
```

#### 4. **Large Bundle Size (~1MB)**

**Problem:** Initial bundle too large, affecting load times

**Solution:** Implemented code splitting in Vite:

```javascript
// vite.config.js
rollupOptions: {
  output: {
    manualChunks: {
      vendor: ['react', 'react-dom'],
      firebase: ['firebase/app', 'firebase/auth'],
      charts: ['recharts'],
      router: ['react-router'],
    }
  }
}
```

**Result:** Main bundle reduced from ~1MB to 460KB

#### 5. **CSS Import Order Warning**

**Problem:** Build warning about CSS `@import` order

**Solution:** Moved Google Fonts import before Tailwind imports:

```css
/* Must be first */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Outfit:wght@400..700&display=swap");

/* Then Tailwind */
@import "tailwindcss";
```

---

### Backend Challenges

#### 1. **Firebase Admin SDK Initialization**

**Problem:** "Firebase app already initialized" error in serverless environment

**Root Cause:** Vercel serverless functions may reuse instances, causing duplicate initialization

**Solution:**

```javascript
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
```

#### 2. **MongoDB Connection Pooling in Serverless**

**Problem:** Too many database connections causing "MongoError: connection pool exhausted"

**Root Cause:** Each serverless invocation created new connection

**Solution:**

```javascript
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
  });

  cachedDb = client.db();
  return cachedDb;
}
```

#### 3. **Token Verification Middleware**

**Problem:** Inconsistent token validation causing 401 errors

**Root Cause:** Token sometimes passed with/without "Bearer " prefix

**Solution:**

```javascript
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Handle both formats
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
```

#### 4. **Date Timezone Handling**

**Problem:** Dates showing one day off in different timezones

**Root Cause:** MongoDB storing UTC, frontend displaying local time incorrectly

**Solution:**

```javascript
// Store dates as ISO strings with time component
const transaction = {
  date: new Date(req.body.date).toISOString(),
};

// Frontend: Parse and format correctly
import { parseISO, format } from "date-fns";
const displayDate = format(parseISO(transaction.date), "MMMM dd, yyyy");
```

#### 5. **API Rate Limiting**

**Problem:** No protection against abuse

**Solution:** Implemented simple rate limiter:

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: { message: "Too many requests, please try again later" },
});

app.use("/api/", limiter);
```

---

## 📁 Project Structure

```
finease-font-end/
├── src/
│   ├── components/
│   │   ├── Common/           # Shared components (Loader, EmptyState, Skeleton)
│   │   ├── Layout/           # Header, Footer, DashboardLayout
│   │   ├── home/             # Landing page sections
│   │   ├── reports/          # Chart components
│   │   ├── transactions/     # Transaction card/form
│   │   └── ui/               # shadcn/ui components
│   ├── Contexts/             # Auth, Theme providers
│   ├── Hooks/                # Custom hooks (useTransactions, useDebounce)
│   ├── Pages/
│   │   ├── Dashboard/        # Dashboard overview
│   │   └── *.jsx             # Page components
│   ├── Router/               # Route definitions
│   ├── lib/                  # Utilities, API, constants
│   └── main.jsx              # App entry point
├── public/
├── vercel.json               # Deployment config
└── vite.config.js            # Build configuration
```

---

## ⚙️ Environment Variables

### Frontend (.env)

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=https://your-backend-url.vercel.app/api
```

### Backend (.env)

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/finease
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## 🧪 Local Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account
- Firebase project

### Frontend

```bash
# Clone repository
git clone https://github.com/Pankaj72885/finease-font-end.git
cd finease-font-end

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev
```

### Backend

```bash
# Clone repository
git clone https://github.com/Pankaj72885/finease-back-end.git
cd finease-back-end

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Start server
npm run dev
```

Access the app at: [http://localhost:5173](http://localhost:5173)

---

## 🚀 Deployment

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy with default settings

### Backend (Vercel Serverless)

1. Connect GitHub repository
2. Add environment variables
3. Configure `vercel.json` for API routes

---

## 📊 Performance Metrics

| Metric                 | Score             |
| ---------------------- | ----------------- |
| Lighthouse Performance | 90+               |
| First Contentful Paint | < 1.5s            |
| Time to Interactive    | < 3s              |
| Bundle Size (gzipped)  | ~135KB main       |
| Code Coverage          | Components tested |

---

## 🔮 Future Roadmap

- [ ] **Recurring Transactions** - Automated monthly entries
- [ ] **Budget Goals** - Set and track spending limits
- [ ] **Export to CSV/PDF** - Download financial reports
- [ ] **Multiple Accounts** - Support for bank accounts
- [ ] **Bill Reminders** - Notification system
- [ ] **Multi-currency** - Support for different currencies
- [ ] **Mobile App** - React Native version

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Recharts](https://recharts.org/) - Charting library
- [Firebase](https://firebase.google.com/) - Authentication service
- [Lucide](https://lucide.dev/) - Icon library

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🧠 Author

<div align="center">

**Pankaj Bepari**

[![GitHub](https://img.shields.io/badge/GitHub-Pankaj72885-181717?style=for-the-badge&logo=github)](https://github.com/Pankaj72885)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Pankaj_Bepari-0A66C2?style=for-the-badge&logo=linkedin)](https://bd.linkedin.com/in/pankaj-bepari-8aa69013a)

_Full-Stack Developer | React Specialist | MERN Stack_

</div>

---

<div align="center">

⭐ **Star this repo if you found it helpful!** ⭐

</div>
