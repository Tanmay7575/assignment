# Scalable REST API with Authentication & Role-Based Access



## 📌 Overview
This project is built as part of the **Backend Developer Intern Assignment**.  
It demonstrates a **scalable REST API** with authentication, role-based access, CRUD operations, and a simple frontend UI for testing APIs.  

## 🚀 Features
### ✅ Backend
- User registration & login with **JWT authentication**
- **Role-based access control** (User vs Admin)
- CRUD APIs for secondary entity (**Tasks**)
- API versioning (`/api/user/...`)
- Centralized error handling & validation
- Password hashing with **bcrypt**
- Database: **MongoDB** (Mongoose ORM)
- API documentation with Postman collection

### ✅ Frontend
- Built with **React.js**
- User registration & login UI
- JWT-secured dashboard
- CRUD actions on tasks (create, update, delete, list)
- Error & success messages from API responses

### ✅ Security & Scalability
- Secure **JWT token handling**
- Input validation & sanitization
- Scalable project structure for new modules
- Future scalability options:  
  - Microservices architecture  
  - Caching with Redis  
  - Logging & Monitoring  
  - 
## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt
- **Frontend:** React.js, Axios, Context API
- **Docs: Postman
- 
## 📂 Project Structure
backend/
├── src/
│   ├── middleware/        # Express middleware (e.g., authentication)
│   ├── models/            # Database schemas and data models
│   ├── routes/            # API endpoints
│   └── index.ts           # Main server entry point
├── .env                   # Environment variables (e.g., database URI)
├── package.json           # Backend dependencies and scripts
└── tsconfig.json          # TypeScript configuration

frontend/
├── public/                # Static assets (index.html)
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable UI components
│   ├── context/           # React Context for state management
│   ├── layout/            # Layout components (header, footer)
│   ├── pages/             # Pages that correspond to routes
│   └── App.tsx            # Main application component
└── package.json           # Frontend dependencies and scripts

## 🔑 Installation & Setup

### 1 Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # Add your DB_URI, JWT_SECRET
npm run dev

### 2 frontend Setup
cd frontend
npm install
npm run dev

