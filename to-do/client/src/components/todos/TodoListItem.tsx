import AppButton from '../shared/AppButton.tsx';
import { CiPen, CiTrash } from 'react-icons/ci';

interface TodoItemProps {
  id: string;
  title: string;
  description: string;
  deleteTotoItem: (id: string) => Promise<void>;
  editTodoItem: (id: string) => void;
}

export default function TodoListItem({
  id,
  title,
  description,
  deleteTotoItem,
  editTodoItem
}: TodoItemProps) {
  return (
    <div className="min-w-[300px] rounded overflow-hidden shadow-lg p-3 bg-white">
      <div className="px-3 py-2">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="flex gap-2 justify-end items-center mt-4">
        <AppButton
          icon={<CiPen className="h-6 w-6 text-gray-600" />}
          isIcon
          size="small"
          type="button"
          onClick={() => editTodoItem(id)}
        />
        <AppButton
          icon={<CiTrash className="h-6 w-6 text-red-500" />}
          isIcon
          size="small"
          type="button"
          onClick={() => deleteTotoItem(id)}
        />
      </div>
    </div>
  );
}
