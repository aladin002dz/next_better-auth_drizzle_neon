'use server';

import { db } from '@/db/db';
import { tasks } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function fetchTasks() {
    try {
        //const allTasks = await db.select().from(tasks).orderBy(tasks.createdAt);
        const allTasks = await db.select().from(tasks);
        return { success: true, data: allTasks };
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return { success: false, error: 'Failed to fetch tasks' };
    }
}

export async function createTask(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const status = formData.get('status') as string;

        if (!title || !title.trim()) {
            return { success: false, error: 'Title is required' };
        }

        const newTask = await db
            .insert(tasks)
            .values({
                title: title.trim(),
                description: description?.trim() || null,
                status: status || 'pending',
            })
            .returning();

        // Revalidate the page to show the new task
        revalidatePath('/');

        return { success: true, data: newTask[0] };
    } catch (error) {
        console.error('Error creating task:', error);
        return { success: false, error: 'Failed to create task' };
    }
}
