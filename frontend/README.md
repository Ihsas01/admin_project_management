# 🖥️ Frontend - Role-Based Admin & Project Management System

This is the frontend application for the Role-Based Admin & Project Management System. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.x
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

# Edit .env with your backend API URL
VITE_API_BASE_URL=http://localhost:5000/api
```

3. **Run the Application**
```bash
# Development mode
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🏗️ Architecture

### Folder Structure
```
src/
├── api/              # API service configuration
│   └── api.ts        # Axios instance with interceptors
├── components/       # Reusable UI components
│   ├── Header.tsx
│   ├── Layout.tsx
│   └── Sidebar.tsx
├── pages/            # Page components
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── ProjectManagementPage.tsx
│   ├── RegisterPage.tsx
│   └── UserManagementPage.tsx
├── store/            # Redux store setup
│   ├── authSlice.ts  # Authentication state management
│   └── store.ts      # Store configuration
├── hooks/            # Custom React hooks
├── routes/           # Routing configuration
├── utils/            # Utility functions
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles and Tailwind imports
```

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Responsive sidebar navigation
- Adaptive grid layouts
- Touch-friendly controls

### User Experience
- Loading states for all API operations
- Form validation feedback
- Role-based UI rendering
- Optimistic UI updates
- Error boundary handling

## 🔄 State Management

### Redux Toolkit
- Centralized application state
- Authentication state management
- Async action handling with createAsyncThunk
- Normalized state structure
- TypeScript integration

### React Query
- Server state management
- Automatic caching and refetching
- Optimistic updates
- Error handling and retries
- Background data synchronization

## 📊 Pages & Components

### Core Pages
- **Login Page**: Secure authentication
- **Register Page**: Invite-based registration
- **Dashboard**: Overview and quick actions
- **User Management**: Admin-only user management
- **Project Management**: Project CRUD operations

### Shared Components
- **Layout**: Main application layout with sidebar
- **Header**: Top navigation bar with user info
- **Sidebar**: Role-based navigation menu

## 🔐 Security Features

1. **Token Storage**: JWT tokens stored in localStorage
2. **Authorization Headers**: Auto-injection of auth headers
3. **Session Management**: Automatic logout on token expiration
4. **Role-Based Rendering**: UI elements hidden based on user roles
5. **Secure Intercepts**: Request/response interceptors for security

## 🎯 Role-Based Access

### Role Permissions
- **ADMIN**: Full access to all features
  - User management (create, update roles/status)
  - Project management (all operations)
  - System settings

- **MANAGER**: Project management access
  - Create and manage projects
  - View projects
  - Limited user access

- **STAFF**: Read-only access to projects
  - View projects
  - Basic operations

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔧 Configuration

### Environment Variables
- `VITE_API_BASE_URL`: Backend API base URL (default: http://localhost:5000/api)
- `VITE_APP_NAME`: Application name (default: Admin Project Management)

## 🚀 Deployment

### Production Deployment
```bash
# Build for production
npm run build

# The build artifacts will be in the `dist/` directory
# Deploy the dist folder to your web server
```

### Docker Deployment
```dockerfile
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Static Hosting
The frontend is built as a static site and can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 🛠️ Development Tools

- **Vite**: Fast bundler with Hot Module Replacement
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **ESLint**: Code quality and style enforcement
- **Prettier**: Code formatting
