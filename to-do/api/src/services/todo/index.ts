import Todo from '../../models/todo'
import { TodoItem } from '../../core/todo'

export class TodoService {
  async getAllTodos(): Promise<Todo[]> {
    return await Todo.findAll()
  }

  async createTodo(todo: TodoItem): Promise<TodoItem> {
    return Todo.create(todo)
  }

  async updateTodo(id: number, newData: Partial<TodoItem>): Promise<TodoItem | null> {
    await Todo.update({ ...newData }, { where: { id } })
    return await Todo.findOne({ where: { id } })
  }

  async deleteTodo(id: number): Promise<void> {
    await Todo.destroy({ where: { id } })
  }
}
