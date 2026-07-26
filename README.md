# Mini ERP & CRM Operations Portal

A complete Full Stack ERP & CRM web application developed using **React.js, Node.js, Express.js, MySQL, Railway, Render, and Vercel**. This project provides a centralized business management system for handling customers, products, inventory, sales, reports, users, and settings through an intuitive and responsive dashboard.

---

# Project Overview

The **Mini ERP & CRM Operations Portal** is designed to simplify business operations by providing a centralized dashboard where administrators can efficiently manage customers, inventory, products, sales, reports, users, and application settings.

The application follows a modern full-stack architecture:

- React.js Frontend
- Node.js & Express.js Backend
- Railway MySQL Database
- REST API Communication using Axios
- Frontend deployed on Vercel
- Backend deployed on Render

---

# Objectives

- Manage customers efficiently
- Manage products and inventory
- Create and manage sales challans
- Generate business reports
- Maintain user accounts
- Store business data securely
- Provide an attractive and responsive dashboard

---

# Features

- Secure Login Page
- Dashboard Overview
- Customer Management
- Product Management
- Inventory Management
- Sales Challan Management
- Reports Module
- User Management
- Settings Module
- CRUD Operations
- Responsive Design
- Railway MySQL Integration
- REST API Integration

---

# Tech Stack

## Frontend

- React.js
- TypeScript
- Vite
- Axios
- React Router DOM
- Tailwind CSS

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
          Axios REST API Calls
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
- Remember Me
- Password Visibility Toggle

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

- Add Product
- Update Product
- Delete Product
- Search Product

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

- Company Details
- Update Profile
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
│   │   ├── Dashboard.tsx
│   │   ├── Customers.tsx
│   │   ├── Products.tsx
│   │   ├── Inventory.tsx
│   │   ├── SalesChallan.tsx
│   │   ├── Reports.tsx
│   │   ├── Users.tsx
│   │   ├── Settings.tsx
│   │   └── Login.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── package.json
│
├── server
│   ├── src
│   │
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── customerController.js
│   │   ├── productController.js
│   │   ├── inventoryController.js
│   │   ├── salesController.js
│   │   ├── reportController.js
│   │   ├── dashboardController.js
│   │   ├── userController.js
│   │   └── settingController.js
│   │
│   ├── routes
│   │   ├── customerRoutes.js
│   │   ├── productRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── salesRoutes.js
│   │   ├── reportRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── userRoutes.js
│   │   └── settingRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# Database

## Database Used

- Railway MySQL

## Tables

- customers
- products
- inventory
- sales
- users
- settings

---

# REST API Endpoints

## GET

```
/customers
/products
/inventory
/sales
/reports
/dashboard
/users
/settings
```

## POST

```
/customers
/products
/inventory
/sales
/users
```

## PUT

```
/customers/:id
/products/:id
/inventory/:id
/sales/:id
/users/:id
/settings
```

## DELETE

```
/customers/:id
/products/:id
/inventory/:id
/sales/:id
/users/:id
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/Srinitha03/mini-erp-crm.git
```

## Frontend

```bash
cd client
npm install
npm run dev
```

## Backend

```bash
cd server
npm install
npm run dev
```

---

# Environment Variables

Create a `.env` file inside the **server** folder.

```env
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
- React.js
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

## Frontend (Vercel)

https://mini-erp-crm-git-main-srinitha03s-projects.vercel.app

## Backend (Render)

https://mini-erp-crm-rf8if.onrender.com

## Database

Railway MySQL

## GitHub Repository

https://github.com/Srinitha03/mini-erp-crm

---

# What We Implemented

- Developed a complete ERP & CRM Operations Portal using React.js, Node.js, Express.js, and MySQL.
- Implemented CRUD operations for Customers, Products, Inventory, Sales, Users, and Settings.
- Connected the frontend and backend using REST APIs.
- Integrated Railway MySQL Database.
- Deployed the frontend using Vercel.
- Deployed the backend using Render.
- Built a responsive and modern user interface.
- Implemented Dashboard analytics and business management modules.

---

# Author

**Maddenapelli Srinitha**

B.Tech – Artificial Intelligence & Machine Learning

Vignans Institute of Management and Technology for Women

---

# License

This project is developed for educational, internship, and learning purposes only.
