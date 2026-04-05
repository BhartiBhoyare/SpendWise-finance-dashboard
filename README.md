# 💰 SpendWise — Smart Finance Dashboard

SpendWise is a modern, responsive finance dashboard built using React.js and Tailwind CSS.  
It helps users manage their income and expenses, visualize financial data, and gain meaningful insights.

---

## 🚀 Live Demo

👉 https://spend-wise-finance-dashboard.vercel.app/

---

## 📌 Overview

This project is designed to simulate a real-world personal finance management system.  
Users can track transactions, analyze spending patterns, and manage financial goals through an interactive dashboard.

The application focuses on:
- Clean UI/UX
- Real-time data updates
- Scalable component architecture
- Practical financial insights

---

## 🧠 Approach

The project follows a **component-based architecture** using React.

### Key Design Decisions:

- **Context API for State Management**
  - Centralized handling of:
    - Transactions
    - Filters
    - User role (Admin/Viewer)
    - Theme (Dark/Light)

- **Data Persistence**
  - LocalStorage is used to store:
    - Transactions
    - User settings (salary, limits, theme)

- **Derived Data Logic**
  - Dashboard values (income, expenses, balance) are computed dynamically
  - Insights are generated from transaction data

- **Separation of Concerns**
  - UI components (cards, charts, table)
  - Business logic (filters, calculations)
  - Global state (context)

---

## ✨ Features

### 📊 Dashboard Overview
- Total Balance, Income, and Expenses cards
- Dynamic updates based on transactions
- Time-based and category-based charts

---

### 🧾 Transactions Management
- Add, Edit, Delete transactions
- Date-wise sorting (latest first within same day)
- Role-based actions:
  - Admin → full access
  - Viewer → read-only

---

### 🔍 Filtering & Search
- Filter by:
  - All
  - Income
  - Expense
- Date-based filtering (monthly, yearly, custom)

---

### 📈 Insights Section
- Income vs Expense comparison
- Savings / Overspending detection
- Monthly trend analysis
- Expense limit tracking with alerts

---

### 💰 Salary Automation
- User sets:
  - Monthly salary amount
  - Credit date
- System automatically:
  - Adds salary transaction on matching date
  - Prevents duplicate entries

---

### 🎨 UI / UX Features
- Fully responsive design
- Dark / Light mode
- Animated charts and transitions
- Custom dropdowns and modals
- Styled confirmation dialogs

---

## 🛠 Tech Stack

- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Animations:** Framer Motion
- **State Management:** Context API
- **Storage:** LocalStorage

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/BhartiBhoyare/SpendWise-finance-dashboard
cd SpendWise-finance-dashboard
