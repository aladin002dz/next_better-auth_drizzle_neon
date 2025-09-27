'use client';

import { Task } from '@/db/schema';

interface TaskListProps {
    tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in-progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'pending':
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (tasks.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Tasks</h2>
                <p className="text-gray-500">No tasks yet. Add one above to get started!</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tasks ({tasks.length})</h2>

            <div className="space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                            <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}
                            >
                                {task.status.replace('-', ' ').toUpperCase()}
                            </span>
                        </div>

                        {task.description && (
                            <p className="text-gray-600 mb-3">{task.description}</p>
                        )}

                        <div className="text-sm text-gray-500">
                            <p>Created: {formatDate(task.createdAt)}</p>
                            {task.updatedAt && task.updatedAt.getTime() !== task.createdAt.getTime() && (
                                <p>Updated: {formatDate(task.updatedAt)}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
