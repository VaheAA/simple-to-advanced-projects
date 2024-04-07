import dotenv from 'dotenv';
dotenv.config();

const DATABASE_USER = process.env.DB_USER
const DATABASE_NAME = process.env.DB_NAME
const DATABASE_PASSWORD = process.env.MYSQL_ROOT_PASSWORD
const DATABASE_HOST = process.env.DB_HOST

const config = {
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  username: DATABASE_USER,
  host: DATABASE_HOST
}

export default config