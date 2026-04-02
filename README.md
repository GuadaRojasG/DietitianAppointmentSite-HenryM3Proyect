# 🥗 Nutrition Appointment Manager

A full-stack web application for managing nutrition appointments. Users can register, log in, schedule and cancel appointments, and view their upcoming sessions.

---

## 🚀 Tech Stack

### Frontend
- **React** with Vite
- **Context API** for global state management
- **CSS Modules** for scoped styling
- **React Router** for client-side navigation

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **TypeORM** for database management
- **PostgreSQL** as the database
- **DTOs & Interfaces** for data validation and typing

---

## 📁 Project Structure

```
PM3-GuadaRojasG/
├── front/          # React frontend (Vite)
│   └── vite-project/
│       ├── src/
│       │   ├── components/   # Navbar, NotFound, Turno
│       │   ├── views/        # Home, Login, Register, AgendarTurnos, MisTurnos
│       │   ├── context/      # UsersContext (global auth state)
│       │   └── utils/        # Validations, appointment helpers
└── back/           # Node.js + Express backend
    └── src/
        ├── controllers/  # Appointments & Users controllers
        ├── entities/     # TypeORM entities (User, Appointment, Credential)
        ├── repositories/ # Data access layer
        ├── services/     # Business logic
        ├── routes/       # API routes
        └── DTO/          # Data Transfer Objects
```

---

## ✨ Features

- 🔐 User authentication (Register & Login)
- 📅 Schedule new appointments
- ❌ Cancel existing appointments
- 📋 View all personal appointments
- 🛡️ Form validation on both client and server side
- 🌐 RESTful API

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL

### Backend Setup

```bash
cd back
npm install
# Configure your .env file (see .env.example)
npm run dev
```

### Frontend Setup

```bash
cd front/vite-project
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the `/back` directory based on `.env.example`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=3000
```

---

## 📬 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Login with credentials |
| GET | `/appointments/:id` | Get user appointments |
| POST | `/appointments/schedule` | Schedule an appointment |
| PUT | `/appointments/cancel/:id` | Cancel an appointment |

---

## 👩‍💻 Author

**Guadalupe Rojas G.**  
Full Stack Developer
