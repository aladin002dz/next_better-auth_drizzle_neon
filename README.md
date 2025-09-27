# Todo App with Authentication

A full-stack todo application built with Next.js, Better Auth, Drizzle ORM, and PostgreSQL. This app provides secure user authentication and allows authenticated users to create, view, and manage their personal tasks.

## Features

- 🔐 **User Authentication**: Secure login/signup with email and password
- 👤 **User Management**: User profiles and session management
- ✅ **Task Management**: Add, view, and manage personal tasks
- 🎨 **Modern UI**: Responsive design with Tailwind CSS
- 🗄️ **Database**: Persistent data storage with Drizzle ORM
- 🛡️ **Route Protection**: Middleware-based authentication guards
- ⚡ **Performance**: Fast development with Next.js 15 and Turbopack

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Authentication**: Better Auth with email/password and social providers
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon (serverless PostgreSQL)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (recommended: [Neon](https://neon.tech/))

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up your environment variables:

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@your-database-url"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Social Providers (Optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

For Neon, your DATABASE_URL will look like:

```
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

3. Generate and run database migrations:

```bash
npm run db:generate
npm run db:migrate
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication Flow

1. **Sign Up**: New users can create an account with email and password
2. **Sign In**: Existing users can log in with their credentials
3. **Protected Routes**: The main dashboard is protected and requires authentication
4. **Session Management**: User sessions are managed automatically by Better Auth
5. **Route Guards**: Middleware redirects unauthenticated users to login page

## Usage

1. Visit the application at `http://localhost:3000`
2. If not authenticated, you'll be redirected to the login page
3. Create a new account or sign in with existing credentials
4. Once authenticated, you'll be redirected to the main dashboard
5. Add, view, and manage your personal tasks
6. Your user profile is displayed at the top of the dashboard

## Database Schema

The app uses the following database tables:

### Users Table

- `id`: Text primary key
- `name`: User's full name
- `email`: User's email address (unique)
- `emailVerified`: Boolean for email verification status
- `image`: User's profile image URL
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

### Tasks Table

- `id`: Serial primary key
- `title`: Task title (required, max 255 characters)
- `description`: Task description (optional, text)
- `status`: Task status (pending, in-progress, completed)
- `userId`: Foreign key referencing the user who owns the task
- `createdAt`: Task creation timestamp
- `updatedAt`: Last update timestamp

### Authentication Tables

- `session`: User session management
- `account`: OAuth account linking
- `verification`: Email verification tokens

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/  # Better Auth API routes
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── layout.tsx          # Root layout with AuthProvider
│   └── page.tsx            # Main dashboard page
├── components/
│   ├── AuthProvider.tsx    # Authentication context provider
│   ├── LoginForm.tsx       # Login form component
│   ├── SignupForm.tsx      # Signup form component
│   ├── TaskForm.tsx        # Form for adding new tasks
│   ├── TaskList.tsx        # Component for displaying tasks
│   └── UserProfile.tsx     # User profile component
├── db/
│   ├── db.ts               # Database connection
│   └── schema.ts           # Database schema definitions
├── lib/
│   ├── actions.ts          # Server actions for tasks
│   ├── auth.ts             # Better Auth configuration
│   ├── auth-client.ts      # Client-side auth utilities
│   └── utils.ts            # Utility functions
└── middleware.ts           # Route protection middleware
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
