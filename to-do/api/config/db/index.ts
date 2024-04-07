import { Sequelize } from 'sequelize'
import config from '../config'

const dbModel = new Sequelize(config.database!, config.username!, config.password, {
  host: config.host,
  dialect: 'mysql',
})

dbModel
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error)
  })

export default dbModel
