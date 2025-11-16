# Sales Order Management System

A full-stack web application for managing sales orders with a **clean, scalable, and production-ready architecture**. Built using **.NET 8 Web API** (Clean Architecture) and **React + TypeScript** (Redux Toolkit).

---

## Features

- **Full CRUD** for Sales Orders
- **Customer & Item auto-fill** (address, price, description)
- **Real-time calculations** (Excl, Tax, Incl)
- **Print-ready invoice layout**
- **Responsive UI** with Tailwind CSS
- **Error-safe state management**

---

## Tech Stack

| Layer       | Technology                                  |
|-------------|---------------------------------------------|
| **Backend** | .NET 8 Web API, EF Core, SQL Server         |
| **Frontend**| React 18, TypeScript, Redux Toolkit, Vite   |
| **ORM**     | Entity Framework Core                       |
| **Mapping** | AutoMapper                                  |
| **HTTP**    | Axios                                       |
| **Styling** | Tailwind CSS                                |
| **State**   | Redux Toolkit (Async Thunks, Slices)        |

---

## Architecture Overview

### Backend: **Clean Architecture (N-Tier)**

```
SalesOrderSystem_BackEnd/
├── API/
│   ├── Controllers/     # REST endpoints
│   └── Models/          # DTOs
├── Application/
│   ├── Interfaces/      # Service contracts
│   └── Services/        # Business logic
├── Domain/
│   ├── Entities/        # Core models
│   └── Interfaces/
├── Infrastructure/
│   ├── Data/            # AppDbContext
│   └── Repositories/    # EF Core repositories
└── Program.cs           # DI, CORS, Middleware
```

### Key Backend Components

- **.NET Core Web API** – RESTful endpoints
- **Entity Framework Core** – ORM with SQL Server
- **AutoMapper** – DTO to Entity mapping
- **Dependency Injection** – Built-in .NET DI container
- **CORS** – Enabled for React frontend

---

### Frontend: **React + Redux Toolkit**

```
frontend/src/
├── components/      # Reusable UI components
├── pages/           # Route pages (Home, SalesOrder)
├── redux/
│   └── slices/      # orderSlice, customerSlice, itemSlice
├── services/        # API service layer (Axios)
├── utils/           # Helper functions (format.ts)
├── hooks/           # Custom hooks (useAppDispatch, useAppSelector)
└── App.tsx          # Main routing and layout
```

---

## API Endpoints

| Method | Endpoint                          | Description             |
|--------|-----------------------------------|-------------------------|
| GET    | `/api/salesorders`                | List all orders         |
| GET    | `/api/salesorders/{id}`           | Get order by ID         |
| POST   | `/api/salesorders`                | Create new order        |
| PUT    | `/api/salesorders/{id}`           | Update existing order   |

---

## Database Migration

Apply migrations using the following commands:

```bash
add-migration "initial migration"
update-database
```

---

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js ≥18](https://nodejs.org/)
- SQL Server (LocalDB or Express)

---

### 1. Clone the Repository

```bash
git clone https://github.com/PasinduNimeshS/Sales_Order_System.git
```

---

## Key Implementations

### Auto-Fill Logic

- **Customer**: Select name to auto-fill address fields
- **Item**: Enter code to auto-fill description & price

### Print Layout

- Clean, professional invoice
- Hides navigation & buttons
- Optimized with `@media print`

---

## Folder Structure

### Backend (Clean Architecture)

```
/SalesOrderSystem_BackEnd
├── API/
│   ├── Controllers/
│   └── Models/
├── Application/
│   ├── Controllers/
│   └── Services/
├── Domain/
│   ├── Entities/
│   └── Interfaces/
├── Infrastructure/
│   ├── Data/
│   └── Repositories/
└── Program.cs
```

### Frontend (React + Redux)

```
frontend/src/
├── components/      # Reusable UI components
├── pages/           # Route pages (Home, SalesOrder)
├── redux/
│   └── slices/      # orderSlice, customerSlice, itemSlice
├── services/        # API service layer (Axios)
├── utils/           # Helper functions (format.ts)
├── hooks/           # Custom hooks (useAppDispatch, useAppSelector)
└── App.tsx          # Main routing and layout
```

---
