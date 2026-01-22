# 🛠️ Backend - Role-Based Admin & Project Management System

This is the backend service for the Role-Based Admin & Project Management System. Built with Node.js, Express, TypeScript, and PostgreSQL.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.x
- PostgreSQL >= 13.x
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Environment Setup**
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your database credentials
DATABASE_URL="postgresql://username:password@localhost:5432/admin_project_management"
JWT_SECRET="your-super-secret-jwt-key-here"
```

3. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed initial data
npm run seed
```

4. **Run the Application**
```bash
# Development mode
npm run dev

# Production mode (after building)
npm run build
npm start
```

## 🏗️ Architecture

### Folder Structure
```
src/
├── config/           # Configuration files
│   ├── db.ts         # Database connection
│   └── environment.ts # Environment variables
├── middlewares/      # Express middlewares
│   ├── auth.ts       # Authentication middleware
│   ├── validation.ts # Validation middleware
│   └── errorHandler.ts # Error handling
├── modules/          # Feature modules
│   ├── auth/         # Authentication features
│   ├── users/        # User management
│   └── projects/     # Project management
├── utils/            # Utility functions
│   ├── auth.ts       # Authentication utilities
│   ├── errors.ts     # Custom error classes
│   └── response.ts   # Response utilities
├── app.ts            # Express app setup
└── server.ts         # Server entry point
```

### Database Schema
The system uses PostgreSQL with Prisma ORM. The schema includes:

- **User**: Stores user information (name, email, role, status)
- **Invite**: Tracks invite tokens for user registration
- **Project**: Manages project information with status tracking

## 🔐 Authentication & Authorization

### JWT Implementation
- Tokens expire after 24 hours (configurable)
- Tokens are stored in HTTP-only cookies or Bearer headers
- Refresh tokens for extended sessions

### Role-Based Access Control
- **ADMIN**: Full access to all features
- **MANAGER**: Project management, limited user access
- **STAFF**: Project viewing and basic operations

## 📡 API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/register-via-invite
POST /api/auth/invite (ADMIN only)
```

### Users (ADMIN only)
```
GET  /api/users?page=&limit= (paginated)
PATCH /api/users/:id/role
PATCH /api/users/:id/status
```

### Projects
```
POST   /api/projects
GET    /api/projects
PATCH  /api/projects/:id (ADMIN only)
DELETE /api/projects/:id (ADMIN only, soft delete)
```

## 🛡️ Security Features

1. **Password Security**: All passwords are hashed using bcrypt
2. **Input Validation**: All inputs are validated using Zod schemas
3. **Rate Limiting**: Prevents brute force attacks
4. **CORS**: Configured to allow only trusted origins
5. **CSRF Protection**: Implemented for form submissions
6. **SQL Injection Prevention**: Prisma ORM prevents injection attacks

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Seeding Data
The seed script creates:
- 1 ADMIN user (admin@example.com)
- 1 MANAGER user (manager@example.com)
- 1 STAFF user (staff@example.com)
- Sample projects for each user

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRES_IN`: Token expiration time (default: 24h)
- `BCRYPT_SALT_ROUNDS`: Salt rounds for password hashing (default: 12)
- `NODE_ENV`: Environment mode (development/production)
- `PORT`: Server port (default: 5000)

## 🚀 Deployment

### Production Deployment
1. Ensure `NODE_ENV=production` in your environment
2. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start dist/server.js --name "admin-backend"
```

### Docker Deployment
```dockerfile
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]
```
