# Todo App

A simple todo application built with Next.js, Drizzle ORM, and PostgreSQL. This app allows you to create, view, and manage tasks with titles, descriptions, and status tracking.

## Features

- ✅ Add new tasks with title, description, and status
- 📋 View all tasks in a clean, organized list
- 🎨 Modern, responsive UI with Tailwind CSS
- 🗄️ Persistent data storage with Drizzle ORM
- ⚡ Fast development with Next.js 15 and Turbopack

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon (serverless PostgreSQL)

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
DATABASE_URL="postgresql://username:password@your-database-url"
```

For Neon, your URL will look like:

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

## Database Schema

The app uses a simple `tasks` table with the following structure:

- `id`: Serial primary key
- `title`: Task title (required, max 255 characters)
- `description`: Task description (optional, text)
- `status`: Task status (pending, in-progress, completed)
- `createdAt`: Timestamp when task was created
- `updatedAt`: Timestamp when task was last updated

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
│   ├── api/tasks/     # API routes for task operations
│   ├── layout.tsx     # Root layout component
│   └── page.tsx       # Main page component
├── components/
│   ├── TaskForm.tsx   # Form for adding new tasks
│   └── TaskList.tsx   # Component for displaying tasks
└── lib/
    ├── db.ts          # Database connection
    └── schema.ts      # Database schema definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
