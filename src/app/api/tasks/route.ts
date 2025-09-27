import { db } from '@/lib/db';
import { tasks } from '@/lib/schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const allTasks = await db.select().from(tasks).orderBy(tasks.createdAt);
        return NextResponse.json(allTasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, status } = body;

        if (!title || !title.trim()) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const newTask = await db
            .insert(tasks)
            .values({
                title: title.trim(),
                description: description?.trim() || null,
                status: status || 'pending',
            })
            .returning();

        return NextResponse.json(newTask[0], { status: 201 });
    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
    }
}
