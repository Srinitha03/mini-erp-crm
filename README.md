# Mini ERP & CRM Operations Portal

A complete Full Stack ERP & CRM web application developed using React, Node.js, Express.js, MySQL, Railway, Render, and Vercel. This project provides an easy-to-use business management system for handling customers, products, inventory, sales, reports, users, and settings.

---

# Project Overview

The Mini ERP & CRM Operations Portal is designed to simplify business operations by providing a centralized dashboard where administrators can manage customers, inventory, products, sales, reports, users, and application settings. The project follows a modern full-stack architecture with a React frontend, Express backend, and MySQL database.

---

# Objectives

- Manage customers efficiently.
- Manage products and inventory.
- Create and manage sales challans.
- Generate reports.
- Maintain user accounts.
- Store business data securely.
- Provide an attractive and responsive dashboard.

---

# Features

- Secure Login Page
- Dashboard
- Customer Management
- Product Management
- Inventory Management
- Sales Challan Management
- Reports Module
- User Management
- Settings Module
- CRUD Operations
- Responsive Design
- MySQL Database Integration
- REST API Integration

---

# Tech Stack

## Frontend

- React.js
- TypeScript
- Vite
- Axios
- React Router
- CSS

## Backend

- Node.js
- Express.js

## Database

- MySQL (Railway)

## Deployment

- Frontend – Vercel
- Backend – Render
- Database – Railway

---

# System Architecture

```
                  User
                    │
                    ▼
          React Frontend (Vercel)
                    │
          Axios REST API Requests
                    │
                    ▼
        Node.js + Express Backend
              (Render Server)
                    │
                    ▼
          Railway MySQL Database
```

---

# Modules

## Login

- User Authentication
- Role Selection

## Dashboard

- Total Customers
- Total Products
- Inventory Summary
- Sales Summary
- Reports Overview

## Customers

- Add Customer
- Edit Customer
- Delete Customer
- Search Customer

## Products

- Add Products
- Update Products
- Delete Products
- Search Products

## Inventory

- Stock Management
- Quantity Tracking
- Update Inventory

## Sales Challan

- Create Sales Challan
- Update Sales
- Delete Sales
- View Sales

## Reports

- Sales Reports
- Inventory Reports
- Customer Reports

## Users

- Add User
- Update User
- Delete User

## Settings

- Update Profile
- Company Details
- Change Password

---

# Project Structure

```
MiniERP-CRM
│
├── client
│   ├── src
│   │
│   ├── assets
│   ├── components
│   ├── pages
│   │     ├── Dashboard.tsx
│   │     ├── Customers.tsx
│   │     ├── Products.tsx
│   │     ├── Inventory.tsx
│   │     ├── SalesChallan.tsx
│   │     ├── Reports.tsx
│   │     ├── Users.tsx
│   │     ├── Settings.tsx
│   │     └── Login.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── package.json
│
├── server
│   ├── src
│   │
│   ├── config
│   │      └── db.js
│   │
│   ├── controllers
│   │      ├── customerController.js
│   │      ├── productController.js
│   │      ├── inventoryController.js
│   │      ├── salesController.js
│   │      ├── reportController.js
│   │      ├── dashboardController.js
│   │      ├── userController.js
│   │      └── settingController.js
│   │
│   ├── routes
│   │      ├── customerRoutes.js
│   │      ├── productRoutes.js
│   │      ├── inventoryRoutes.js
│   │      ├── salesRoutes.js
│   │      ├── reportRoutes.js
│   │      ├── dashboardRoutes.js
│   │      ├── userRoutes.js
│   │      └── settingRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# Database

Database Used:

- Railway MySQL

Tables:

- customers
- products
- inventory
- sales
- users
- settings

---

# Output

### Login Page

- User Login
- Remember Me
- Role Selection

### Dashboard

- Business Overview
- Total Customers
- Products
- Sales
- Inventory

### Customers

- Customer Details
- Add/Edit/Delete Customer

### Products

- Product Details
- Product CRUD

### Inventory

- Stock Information
- Inventory Management

### Sales

- Sales Challan
- Order Management

### Reports

- Business Reports
- Sales Summary

### Users

- User Management

### Settings

- Company Settings
- Password Update

---

# APIs Used

GET

- /customers
- /products
- /inventory
- /sales
- /reports
- /dashboard
- /users
- /settings

POST

- /customers
- /products
- /inventory
- /sales
- /users

PUT

- /customers/:id
- /products/:id
- /inventory/:id
- /sales/:id
- /users/:id
- /settings

DELETE

- /customers/:id
- /products/:id
- /inventory/:id
- /sales/:id
- /users/:id

---

# Installation

Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

Frontend

```bash
cd client
npm install
npm run dev
```

Backend

```bash
cd server
npm install
npm run dev
```

---

# Environment Variables

Create a .env file inside server.

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
PORT=5000
```

---

# Software Requirements

- Visual Studio Code
- Node.js
- React
- Express.js
- MySQL
- Railway
- Render
- Vercel
- Git
- GitHub

---

# Hardware Requirements

- Windows 10/11
- Intel i3/i5/i7 Processor
- 4GB RAM or Higher
- Internet Connection

---

# Screenshots

Include screenshots of:

- Login Page
- Dashboard
- Customers
- Products
- Inventory
- Sales
- Reports
- Users
- Settings

---

# Future Enhancements

- JWT Authentication
- Role-Based Access Control
- Email Notifications
- Invoice Generation
- PDF Export
- Excel Export
- Analytics Dashboard
- Mobile Responsive Improvements

---

# Deployment

Frontend

YOUR_VERCEL_LINK

Backend

YOUR_RENDER_LINK

Database

Railway MySQL

GitHub Repository

YOUR_GITHUB_LINK

---

# What We Implemented

- Developed a complete ERP & CRM system using the MERN-related stack (React, Node.js, Express) with MySQL.
- Implemented CRUD operations for all modules.
- Connected frontend and backend using REST APIs.
- Integrated Railway MySQL database.
- Deployed frontend on Vercel.
- Deployed backend on Render.
- Created a responsive user interface.
- Implemented business management modules including Customers, Products, Inventory, Sales, Reports, Users, and Settings.

---

# Author

** Maddenapelli  Srinitha**

B.Tech – Artificial Intelligence & Machine Learning

Vignans Institute of Management and Technology for Women

---

# License

This project is developed for educational and internship purposes only.
