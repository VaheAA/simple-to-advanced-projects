import AppHeader from './components/shared/AppHeader.tsx';
import AppContainer from './components/shared/AppContainer.tsx';
import TodoList from './components/todos/TodoList.tsx';
import AppInput from './components/shared/AppInput.tsx';
import AppButton from './components/shared/AppButton.tsx';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import AppModal from './components/shared/AppModal.tsx';
import NotificationsContainer from './components/shared/AppNotification.tsx';
import { AppNotificationType } from './shared/enums.ts';
import { NotificationContext } from './context/notiification';
import useFetch from './hooks/useFetch.tsx';
import { TodoItem } from './core/todo.ts';
import AppLoader from './components/shared/AppLoader.tsx';
import { API_URL } from './shared/constants.ts';

const fields = ['title', 'description'];

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todoFormData, setTodoFormData] = useState<Record<string, string>>({
    title: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const { addNotification } = useContext(NotificationContext);
  const {
    state: { data, loading, error },
    fetchRequest
  } = useFetch<TodoItem[]>();

  const getTodos = async () => {
    await fetchRequest(`${API_URL}/todos`);
  };

  useEffect(() => {
    getTodos();
  }, []);

  function addNewTodo() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setTodoFormData({ title: '', description: '' });
    setFormErrors({});
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTodoFormData({
      ...todoFormData,
      [e.target.id]: e.target.value
    });
  }

  function validateForm(): boolean {
    let isValid: boolean;
    const errors: Record<string, string> = {};
    for (const key in todoFormData) {
      if (todoFormData[key] === '') errors[key] = `The field ${key} is required`;
      else delete errors[key];
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors({ ...errors });
      isValid = false;
    } else {
      setFormErrors({});
      isValid = true;
    }

    return isValid;
  }

  async function saveTodo(e: FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    if (!isEditing) {
      await fetchRequest(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoFormData)
      });
    } else {
      await fetchRequest(`${API_URL}/todos/${targetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoFormData)
      });
      setTargetId(null);
      setIsEditing(false);
    }

    if (error) {
      addNotification({
        id: new Date().getTime().toString(),
        type: AppNotificationType.ERROR,
        message: error.message
      });
      return;
    } else {
      const message = `New Todo was ${isEditing ? 'updated' : 'added'} successfully.`;

      addNotification({
        id: new Date().getTime().toString(),
        type: AppNotificationType.SUCCESS,
        message
      });

      await getTodos();
    }

    closeModal();
  }

  async function deleteTotoItem(id: string) {
    await fetchRequest(`${API_URL}/todos/${id}`, { method: 'DELETE' });

    if (error) {
      addNotification({
        type: AppNotificationType.ERROR,
        message: error.message
      });
      return;
    } else {
      addNotification({
        type: AppNotificationType.SUCCESS,
        message: 'Todo was deleted successfully'
      });

      await getTodos();
    }
  }

  function toggleEditMode(id: string) {
    const targetTodoItem = data?.find((todo) => todo.id === id);
    if (!targetTodoItem) return;

    setTargetId(id);
    setIsEditing(true);
    setTodoFormData({
      title: targetTodoItem.title,
      description: targetTodoItem.description
    });
    setShowModal(true);
  }

  return (
    <>
      {loading && <AppLoader />}
      <div className="flex flex-col w-full">
        <AppHeader />
        <main className="flex-1 pt-[100px]">
          <AppContainer>
            <h2 className="text-center text-3xl font-bold">Your Todos</h2>
            <AppButton label="Add new Todo" onClick={addNewTodo} />
            <AppModal showModal={showModal} closeModal={closeModal}>
              <form onSubmit={saveTodo} className="w-[400px]">
                <h3 className="mb-4">Add new todo</h3>
                <div className="flex flex-col gap-2 w-full">
                  {fields.map((field) => (
                    <AppInput
                      key={field}
                      type="text"
                      value={todoFormData[field]}
                      name={field}
                      id={field}
                      label={field}
                      onChange={handleChange}
                      errorMessage={formErrors[field]}
                    />
                  ))}
                </div>
                <AppButton label="Save" type="submit" classNames="mt-3" />
              </form>
            </AppModal>
            <TodoList todos={data} deleteTotoItem={deleteTotoItem} editTodoItem={toggleEditMode} />
          </AppContainer>
        </main>
        <NotificationsContainer />
      </div>
    </>
  );
}

export default App;
