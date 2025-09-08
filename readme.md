# 📝 Task Manager - MERN/Next.js App

A full-stack Task Management Web App built with **Next.js 14, Express, MongoDB, and TailwindCSS**.  
Users can register, log in, and manage their personal tasks with authentication and authorization.  

🔗 **Deployed App:** [Task Manager Live](https://task-manager-delta-puce.vercel.app/)  
📂 **GitHub Repository:** [GitHub Repo](https://github.com/anuj8918/task-manager)

---

## 🚀 Features

### 1. Authentication
- User registration & login with **email + password**
- Passwords secured with **bcrypt hashing**
- **JWT-based authentication** for secure access
- Users can only view/manage their own tasks

### 2. Task Management (CRUD)
- Create, view, edit, and delete tasks
- Each task includes:
  - Title
  - Description
  - Status (Pending / Done)
  - CreatedAt timestamp
- Only task creator can update/delete their tasks

### 3. Search, Filter & Pagination
- Search tasks by **title/description**
- Filter tasks by **status (All, Pending, Done)**
- **Pagination** implemented for efficient task listing

### 4. Frontend
- Built with **Next.js 14 (App Router)**
- **TailwindCSS + Shadcn UI** for clean, responsive UI
- Pages:
  - Login / Register
  - Dashboard (Task List)
  - Task Form (Create/Edit)
- Proper **loading & error states**

### 5. Bonus
- **Deployed on Vercel** with MongoDB Atlas
- Used **React Query** for data fetching & caching
- **Optimistic updates** for task actions

---

## 🛠️ Tech Stack
- **Frontend:** Next.js 14, React, TailwindCSS, Shadcn UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Auth:** JWT, bcrypt
- **Deployment:** Vercel (Frontend) & Render (Backend)

---