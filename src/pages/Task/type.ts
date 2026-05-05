export type TaskStatus = 'todo' | 'doing' | 'done';

export type Task = {
  id: number;
  name: string;
  desc?: string;
  deadline?: string | null;
  priority?: 'High' | 'Medium' | 'Low';
  tag?: string;
  status: TaskStatus;
};