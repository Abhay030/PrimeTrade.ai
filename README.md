# PrimeTrade.ai — Full-Stack Task Management Platform

A highly scalable, production-ready Full-Stack web application built to demonstrate core full-stack capabilities. This project highlights a robust REST API backend, secure authentication, role-based access control, and a modern, premium frontend user interface.

## 🚀 Core Features Implemented

### Backend System
- **Authentication & Authorization**: Secure User Registration and Login flow leveraging JWT (JSON Web Tokens) and Bcrypt content hashing (12 salt rounds).
- **Role-Based Access Control (RBAC)**: Distinct permissions dynamically guarded for `user` vs. `admin` roles, restricting data exposure securely.
- **Entity Management (CRUD)**: Fully functional 'Tasks' module to securely Create, Read, Update, and Delete prioritized notes based strictly on relational user ownership.
- **System Architecture**: Strictly modular Node.js/Express environment featuring standardized API versioning (`/api/v1/`), centralized error handling, and robust input validation via Zod schemas. 
- **Database Schema**: Secure MongoDB/Mongoose schemas structured with efficient compound indexing.
- **REST Documentation**: Auto-generating Swagger UI integrated seamlessly into the backend.

### Frontend UI Integration
- **Modern Framework**: Developed cleanly with React 19 (Vite) alongside ultra-fast Tailwind CSS v4 styling.
- **Protected Routing**: Private routing limiting distinct frontend views based directly on the validated JWT role context.
- **Interaction Feedback**: Elegant, real-time error and success Toast notifications mapped dynamically against resolving API payloads.
- **Premium Aesthetics**: Fully responsive dark mode layout paired securely with glassmorphism visual foundations.

## 🔒 Security & Scalability

- **Security Protocols**: Features safe stateless JWT token transmission, cross-origin resourcing safeguards (CORS), Header payload sanitization mapped via `Helmet`, and Express Rate-Limiting against brute-force vulnerabilities.
- **Microservices Ready**: Segmented REST paths operating entirely statelessly. Modular structure natively supports external load balancers and isolated testing procedures without friction.
- **Deployment & Containerization**: Outfitted completely for Docker implementation containing multi-stage Node/Nginx pipelines, ensuring immediate deployment readiness.

