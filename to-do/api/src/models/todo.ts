import { Model, DataTypes, Optional } from 'sequelize'
import dbModel from '../../config/db'
import { TodoItem } from '../core/todo'

type TodoCreationAttributes = Optional<TodoItem, 'id'>

class Todo extends Model<TodoCreationAttributes> implements TodoCreationAttributes {
  declare title: string
  declare description: string
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'todos',
    sequelize: dbModel,
  },
)

export default Todo
