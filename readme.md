# 📝 Task Manager - MERN App

A full-stack Task Management Web App built with **React, Express, MongoDB, and TailwindCSS**.
Users can register, log in, and manage their personal tasks with authentication and authorization.

🔗 **Deployed App:** [Task Manager Live](https://task-manager-delta-puce.vercel.app/)
📂 **GitHub Repository:** [GitHub Repo](https://github.com/anuj8918/task-manager)

---

## 🚀 Features

### 1. Authentication

* User registration & login with **email + password**
* Passwords secured with **bcrypt hashing**
* **JWT-based authentication** for secure access
* Users can only view/manage their own tasks

### 2. Task Management (CRUD)

* Create, view, edit, and delete tasks
* Each task includes:

  * Title
  * Description
  * Status (Pending / Done)
  * CreatedAt timestamp
* Only task creator can update/delete their tasks

### 3. Search, Filter & Pagination

* Search tasks by **title/description**
* Filter tasks by **status (All, Pending, Done)**
* **Pagination** implemented for efficient task listing

### 4. Frontend

* Built with **React**
* **TailwindCSS** for clean, responsive UI
* Pages:

  * Login / Register
  * Dashboard (Task List)
  * Task Form (Create/Edit)
* Proper **loading & error states**

---

## 🛠️ Tech Stack

* **Frontend:** React, TailwindCSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Auth:** JWT, bcrypt
* **Deployment:** Vercel (Frontend) & Render (Backend)

---

## 📦 Installation & Setup

Follow the steps below to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/anuj8918/task-manager.git
cd task-manager
```

### 2. Install dependencies

Install dependencies for both frontend (client) and backend (server):

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd server
npm install
```

### 3. Setup Environment Variables

Create a `.env` file inside the **server/** directory with the following values:

```env
PORT=5000
MONGO_URI=mongodb+srv://<your-user>:<your-password>@cluster0.uxtenmw.mongodb.net/taskdb?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

⚠️ Replace `<your-user>` and `<your-password>` with your actual MongoDB Atlas credentials.
`JWT_SECRET` can be any random secure string.

---

### 4. Run the app locally

#### Start the backend server:

```bash
cd server
node server.js
```

#### Start the frontend (React):

```bash
cd client
npm run dev
```

---

### 5. Access the App

Once both servers are running, open the app in your browser:

👉 [http://localhost:5173](http://localhost:5173)

---


## 👨‍💻 Author

**Anuj Mishra**
📧 [anujmishra.dev@gmail.com](mailto:anujm8918@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/anuj-mishra-9ba5a2249/)

---
