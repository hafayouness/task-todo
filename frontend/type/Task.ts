export interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "done";
  user_id?: number;
  due_date?: string;
}

export interface TaskResponse {
  tasks: Task[];
}
