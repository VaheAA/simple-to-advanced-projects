import TodoListItem from './TodoListItem.tsx';
import { TodoItem } from '../../core/todo.ts';

interface TodoListProps {
  todos: TodoItem[] | null;
  deleteTotoItem: (id: string) => Promise<void>;
  editTodoItem: (id: string) => void;
}

export default function TodoList({ todos, deleteTotoItem, editTodoItem }: TodoListProps) {
  return (
    <div className="flex justify-start gap-4 flex-wrap mt-4">
      {todos?.length === 0 && (
        <h4 className="text-lg font-bold">You do not have any todos, add the first one!</h4>
      )}

      {todos &&
        todos.map((todo) => (
          <TodoListItem
            deleteTotoItem={() => deleteTotoItem(todo.id)}
            editTodoItem={() => editTodoItem(todo.id)}
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
          />
        ))}
    </div>
  );
}
