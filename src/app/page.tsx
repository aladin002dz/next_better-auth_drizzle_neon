'use client';

import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Task } from '@/lib/schema';
import { useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData: { title: string; description: string; status: string }) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks(prev => [...prev, newTask]);
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todo App</h1>
          <p className="text-gray-600">Manage your tasks with ease</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <TaskForm onSubmit={handleAddTask} />
          </div>
          <div>
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
