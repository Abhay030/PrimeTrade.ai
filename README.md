# PrimeTrade — Scalable REST API with Authentication & RBAC

A full-stack task management application with JWT authentication, role-based access control, and a premium React frontend.

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js 22 |
| **Backend** | Express 5 |
| **Database** | MongoDB + Mongoose 8 |
| **Auth** | JWT (jsonwebtoken) + bcryptjs |
| **Validation** | Zod |
| **API Docs** | Swagger UI (swagger-jsdoc) |
| **Frontend** | React 19 + Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **HTTP Client** | Axios |

## Features

### Backend
- User registration & login with bcrypt password hashing
- JWT-based authentication with Bearer tokens
- Role-based access control (user / admin)
- Full CRUD for Tasks with ownership enforcement
- Admin panel: manage users, change roles, delete users
- API versioning (`/api/v1/`)
- Centralized error handling with Mongoose-aware error formatting
- Input validation via Zod schemas
- Rate limiting on auth endpoints
- Security headers via Helmet
- Swagger/OpenAPI 3.0 documentation

### Frontend
- Premium dark-themed UI with glassmorphism design
- Login / Register forms with real-time error feedback
- Protected dashboard with task statistics
- Task CRUD with filtering by status & priority
- Admin panel with role management table
- Responsive design (mobile + desktop)
- Toast notifications for all API interactions

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)

### 1. Clone the repo
```bash
git clone <repo-url>
cd primetrade.ai
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/primetrade
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies API calls to `http://localhost:5000`.

### 4. API Documentation
Once the server is running, open:
```
http://localhost:5000/api/docs
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login, returns JWT |
| GET | `/api/v1/auth/me` | Get current user profile |

### Tasks
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/tasks` | List tasks (own / all for admin) |
| POST | `/api/v1/tasks` | Create task |
| GET | `/api/v1/tasks/:id` | Get task by ID |
| PATCH | `/api/v1/tasks/:id` | Update task |
| DELETE | `/api/v1/tasks/:id` | Delete task |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/admin/users` | List all users |
| PATCH | `/api/v1/admin/users/:id/role` | Update user role |
| DELETE | `/api/v1/admin/users/:id` | Delete user |

## Database Schema

### User
```
{ name, email (unique), password (hashed), role (user|admin), timestamps }
```

### Task
```
{ title, description, status (todo|in_progress|done), priority (low|medium|high), user (ref), timestamps }
```

## Project Structure

```
primetrade.ai/
├── server/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── models/          User.js, Task.js
│   │   ├── middleware/      auth, rbac, validate, errorHandler
│   │   ├── modules/
│   │   │   ├── auth/        routes, controller, service, schema
│   │   │   ├── tasks/       routes, controller, service, schema
│   │   │   └── admin/       routes, controller
│   │   ├── utils/jwt.js
│   │   └── app.js
│   ├── swagger.js
│   └── server.js
├── client/
│   ├── src/
│   │   ├── api/             axios, auth, tasks, admin
│   │   ├── context/         AuthContext
│   │   ├── components/      Navbar, ProtectedRoute, TaskCard, TaskModal
│   │   └── pages/           Login, Register, Dashboard, Tasks, Admin
│   └── vite.config.js
└── README.md
```

## Security Practices

- **Password Hashing:** bcrypt with 12 salt rounds
- **JWT:** HS256 signing, 7-day expiry
- **Input Validation:** Zod schemas validate all request bodies
- **Rate Limiting:** 100 requests / 15 min on auth routes
- **HTTP Headers:** Helmet sets secure headers
- **CORS:** Restricted to configured client origin
- **Error Safety:** Stack traces hidden in production

## Scalability Notes

| Strategy | Status |
|---|---|
| **Modular Architecture** | ✅ Implemented — each domain is a self-contained module |
| **API Versioning** | ✅ Implemented — `/api/v1/` prefix |
| **Stateless Auth** | ✅ Implemented — JWT enables horizontal scaling |
| **Database Indexing** | ✅ Implemented — compound indexes on Task |
| **Redis Caching** | 🔲 Ready — add Redis for session/query caching |
| **Docker** | 🔲 Ready — add Dockerfile + docker-compose |
| **Load Balancing** | 🔲 Ready — stateless design supports Nginx/HAProxy |
| **Microservices** | 🔲 Ready — modules can be extracted to separate services |
| **Message Queues** | 🔲 Ready — add RabbitMQ/Kafka for async processing |

## License

ISC
