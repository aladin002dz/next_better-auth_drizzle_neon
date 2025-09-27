import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import UserProfile from '@/components/UserProfile';
import { fetchTasks } from '@/lib/actions';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const result = await fetchTasks();
  const tasks = (result.success && result.data) ? result.data : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo App</h1>
          <p className="text-gray-600">Manage your tasks with ease</p>
        </header>

        <div className="mb-6">
          <UserProfile />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <TaskForm />
          </div>
          <div>
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
