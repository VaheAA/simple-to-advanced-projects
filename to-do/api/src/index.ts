import express, { Express } from 'express'
import dotenv from 'dotenv'
import '../config/db'
import { todoRouter } from './routes/todoRoutes'
import errorHandlerMiddleware from './middleware/errorHandler'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(errorHandlerMiddleware)

app.use('/api/todos', todoRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
