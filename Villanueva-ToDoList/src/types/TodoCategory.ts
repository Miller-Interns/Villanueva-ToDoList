export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoCategory {
  id: string;
  title: string;
  items: TodoItem[];
}
