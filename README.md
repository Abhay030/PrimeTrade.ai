# PrimeTrade — REST API & React Frontend

A production-ready, full-stack task management web application built to cleanly demonstrate scalable REST API architecture, secure authentication, and a responsive frontend integration.

## Implemented Features

### Backend Architecture
- **JWT Authentication & Security:** Secure token-based registration and login with `bcrypt` (12 salt rounds) password hashing.
- **Role-Based Access Control:** Differentiated capabilities between `user` and `admin` roles, secured by custom routing middleware.
- **RESTful CRUD Operations:** Complete API interaction lifecycle for a specialized `Tasks` entity (Create, Read, Update, Delete) strictly mapping data ownership to assigned users.
- **Robust Error Handling & Validation:** Centralized API error handling middleware formatting clean HTTP status codes, coupled with strict payload validation utilizing `Zod` schemas.
- **API Documentation:** Interactive Swagger interface automatically parsing available route documentation.
- **Database Engineering:** Built natively utilizing Mongoose schemas backed by a MongoDB cluster, inclusive of compound indexing.

### Frontend Integration
- **React.js & Vite:** Highly optimized single-page application built using React 19 natively integrated with Tailwind CSS v4.
- **Protected State Management:** Local JWT session handling with strict route guarding (`<ProtectedRoute>`) ensuring unauthorized viewers are redirected.
- **Functional Interface:** Implemented custom glassmorphism components to create, track, filter, and organize user tasks, with real-time success/error popups directly synced to API responses.
- **Admin Panel Framework:** Privileged user dashboard strictly rendered for authenticated admins to perform platform-wide account and role modifications.

## Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB Atlas or a local MongoDB instance running on port 27017.

### Running Locally (Standard)

1. **Install Dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

2. **Configure Environment**
   Rename `.env.example` (or create a `.env` in the `server` directory) with your basic secrets and MongoDB URI string connecting to your respective database.

3. **Start the Application**
   ```bash
   # In terminal 1 (starts the backend API)
   cd server
   npm run dev

   # In terminal 2 (starts the React frontend)
   cd client
   npm run dev
   ```

### API Documentation
Upon launching the server smoothly, an interactive Swagger dashboard detailing all modular payloads can be thoroughly examined at:
`http://localhost:5000/api/docs`

## Scalability & Deployment Readiness

This codebase is specifically engineered to expand safely into high-load production environments:

1. **Modular Route Boundaries:** Every endpoint (Auth vs Tasks vs Admin) operates firmly in logically separate `/src/modules/` boundaries to simplify microservice extraction.
2. **Stateless Scalability:** Utilizing stateless JSON Web Tokens allows backend instances to easily balance across parallel architectures (e.g., via NGINX or HAProxy) without requiring sticky sessions.
3. **Caching Layer Preparedness:** Controller data extraction layers establish an immediate foundation to effortlessly slot in Redis for frequently pinged `GET` endpoints with simple middleware integrations.
4. **Containerization Ready:** The repository firmly incorporates `Dockerfile` infrastructure (utilizing an optimized Nginx server for frontend static assets and Alpine Linux for the Node runtime) structured cleanly via `docker-compose.yml` for unified, OS-agnostic container orchestration and instantaneous cloud cluster deployment.
