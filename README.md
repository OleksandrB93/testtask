# Frontend Test Assignment

This is a React application built for the ABZ Agency frontend test assignment. The application includes user management functionality with API integration.

## Features

- **User List Display**: Shows users from API with pagination
- **User Registration**: Form with validation for registering new users
- **Position Selection**: Dynamic position options loaded from API
- **Responsive Design**: Mobile-first responsive layout
- **Form Validation**: Real-time validation using Zod and React Hook Form
- **API Integration**: Full CRUD operations with proper error handling

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Query (TanStack Query)** for server state management
- **Axios** for HTTP requests
- **React Hook Form** with Zod validation
- **SCSS** for styling
- **ESLint** for code quality

## API Endpoints

The application integrates with the following API endpoints:

- `GET /users` - Fetch users with pagination
- `GET /positions` - Fetch available positions
- `POST /users` - Register new user

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd testtask
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── api/                 # API client and types
├── components/          # React components
│   ├── Header/         # Header component
│   ├── Hero/           # Hero section
│   ├── Team/           # User list component
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── styles/             # Global styles and variables
└── assets/             # Static assets
```

## Key Features Implementation

### User List with Pagination

- Displays 6 users per page
- "Show more" button for pagination
- Automatic reset to first page after new user registration
- Loading states and error handling

### Registration Form

- Real-time validation
- File upload for user photo
- Dynamic position selection from API
- Success state with option to return to form

### API Integration

- React Query for caching and state management
- Proper error handling and loading states
- Automatic data refetching after mutations

## Browser Support

The application is tested and supports:

- Chrome, Firefox, Edge, Safari (Windows)
- Chrome, Firefox, Safari (macOS)
- Chrome, Safari (iOS)
- Chrome (Android)

## Performance Considerations

- Code splitting with Vite
- Optimized bundle size
- Efficient re-rendering with React Query
- Responsive images and assets
