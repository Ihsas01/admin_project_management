# 🎯 Role-Based Admin & Project Management System

A production-ready Role-Based Admin & Project Management System built with modern technologies. This system implements invite-based user onboarding with strict role-based access control.

## 🏗️ Architecture Overview

### Tech Stack

**Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Primary database
- **Prisma** - ORM for database operations
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing

**Frontend**
- **React** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.x
- PostgreSQL >= 13.x
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd role-based-admin-system
```

2. **Setup Backend**
```bash
cd backend
npm install

# Copy environment file
cp .env.example .env

# Update .env with your database credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/admin_project_management"

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed initial data (creates admin user)
npm run seed

# Start development server
npm run dev
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### Default Credentials
After seeding, you can login with:
- **Email:** admin@example.com
- **Password:** password123
- **Role:** ADMIN

## 🔐 Core Features

### Authentication & Authorization
- ✅ JWT-based authentication
- ✅ Role-based access control (ADMIN, MANAGER, STAFF)
- ✅ Invite-only user registration
- ✅ Secure password hashing with bcrypt
- ✅ Session management with Redux

### User Management
- ✅ Admin-only user management
- ✅ Role assignment (ADMIN, MANAGER, STAFF)
- ✅ User status toggling (ACTIVE/INACTIVE)
- ✅ Paginated user listing

### Project Management
- ✅ Create projects (all authenticated users)
- ✅ View projects (all authenticated users)
- ✅ Update projects (ADMIN only)
- ✅ Soft-delete projects (ADMIN only)
- ✅ Project status management

### Security Features
- ❌ No self-registration (invite-only)
- ✅ Deactivated users cannot login
- ✅ Expired invite tokens
- ✅ Role-based route protection
- ✅ CSRF protection
- ✅ Input validation with Zod

## 📁 Project Structure

```
role-based-admin-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts           # Database configuration
│   │   │   └── environment.ts  # Environment variables
│   │   ├── middlewares/
│   │   │   ├── auth.ts         # Authentication middleware
│   │   │   ├── validation.ts   # Validation middleware
│   │   │   └── errorHandler.ts # Error handling
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── controllers.ts
│   │   │   │   └── routes.ts
│   │   │   ├── users/
│   │   │   │   ├── controllers.ts
│   │   │   │   └── routes.ts
│   │   │   └── projects/
│   │   │       ├── controllers.ts
│   │   │       └── routes.ts
│   │   ├── utils/
│   │   │   ├── auth.ts         # Auth utilities
│   │   │   ├── errors.ts       # Custom errors
│   │   │   └── response.ts     # Response helpers
│   │   ├── app.ts              # Express app setup
│   │   └── server.ts           # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.ts             # Seed script
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.ts          # Axios configuration
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ProjectManagementPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   └── UserManagementPage.tsx
│   │   ├── store/
│   │   │   ├── authSlice.ts
│   │   │   └── store.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env.example
│   └── README.md
│
└── README.md
```

## 🔄 API Endpoints

### Authentication
```
POST /api/auth/login
POST /api/auth/register-via-invite
POST /api/auth/invite (ADMIN only)
```

### Users (ADMIN only)
```
GET  /api/users?page=&limit=
PATCH /api/users/:id/role
PATCH /api/users/:id/status
```

### Projects
```
POST   /api/projects
GET    /api/projects
PATCH  /api/projects/:id (ADMIN only)
DELETE /api/projects/:id (ADMIN only)
```

## 🔒 Security Implementation

### Key Security Decisions
1. **Invite-Only Registration**: Users cannot self-register, preventing unauthorized access
2. **Role-Based Access Control**: Fine-grained permissions based on user roles
3. **JWT Tokens**: Stateless authentication with expiration
4. **Password Hashing**: Bcrypt with configurable salt rounds
5. **Input Validation**: Zod schema validation for all inputs
6. **Soft Deletes**: Projects are soft-deleted to maintain data integrity

### Trade-offs Made
- **Performance vs Security**: Chose security-first approach with thorough validation
- **Complexity vs Usability**: Balanced role-based complexity with intuitive UI
- **Monolithic vs Microservices**: Chose monolithic for simplicity and faster development

## 🧪 Testing

### Manual Testing Steps

1. **Start both servers**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

2. **Test Authentication Flow**
   - Visit http://localhost:3000
   - Login with admin credentials
   - Test invite generation
   - Test registration via invite link

3. **Test Role-Based Access**
   - As ADMIN: Access all features
   - As MANAGER/STAFF: Limited access to user management
   - Test permission boundaries

4. **Test CRUD Operations**
   - Create projects
   - Manage users (admin only)
   - Test soft deletes

## 🚀 Deployment

### Production Considerations
- Set `NODE_ENV=production`
- Use production database
- Configure proper JWT secrets
- Enable HTTPS
- Set up reverse proxy (Nginx/Apache)
- Configure CORS properly
- Set up monitoring and logging

### Environment Variables
See `.env.example` files in both backend and frontend directories for required variables.

## 📝 Development Notes

### Code Quality
- Strict TypeScript configuration
- ESLint with recommended rules
- Consistent naming conventions
- Comprehensive error handling
- Clean architecture patterns

### Future Enhancements
- Email notifications for invites
- File upload for projects
- Real-time updates with WebSockets
- Audit logging
- Advanced filtering and search
- Mobile-responsive design improvements

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---
Built with ❤️ using modern web technologies