import { NextFunction, Request, Response } from 'express'
import { TodoService } from '../../services/todo'
import { TodoItem } from '../../core/todo'

const todoService = new TodoService()

export async function createTodo(
  req: Request<never, never, TodoItem>,
  res: Response<TodoItem>,
  next: NextFunction,
): Promise<void> {
  try {
    const { title, description } = req.body
    const newTodo = await todoService.createTodo({
      title,
      description,
    })
    res.status(201).json(newTodo)
  } catch (error) {
    return next(error)
  }
}

export async function getTodos(req: Request, res: Response<TodoItem[]>, next: NextFunction): Promise<void> {
  try {
    const todos = await todoService.getAllTodos()

    res.status(200).json(todos)
  } catch (error) {
    return next(error)
  }
}

export async function getTodo(req: Request, res: Response): Promise<void> {
  res.send('ok')
}

export async function updateTodo(
  req: Request<never, never, TodoItem>,
  res: Response<TodoItem | null>,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params
    const { description, title } = req.body

    const updatedTodo = await todoService.updateTodo(Number(id), {
      title: title,
      description: description,
    })

    res.status(201).json(updatedTodo)
  } catch (error) {
    return next(error)
  }
}

export async function deleteTodo(
  req: Request<{ id: string }>,
  res: Response<{ message: string }>,
  next: NextFunction,
): Promise<void> {
  try {
    const { id } = req.params
    await todoService.deleteTodo(Number(id))

    res.status(200).json({ message: 'Todo item was deleted' })
  } catch (error) {
    return next(error)
  }
}
