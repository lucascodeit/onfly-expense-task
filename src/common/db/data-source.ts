import { DataSource } from 'typeorm'
import { join } from 'path'
import dotenv from 'dotenv'
import environment from '../environment/environment'

dotenv.config()

const parentDir = join(__dirname, '..', '..')

let AppDataSource: DataSource

export const dataSource = new DataSource({
  type: 'mysql',
  host: environment.DB_HOST,
  port: Number(environment.DB_PORT),
  username: environment.DB_USERNAME,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
  synchronize: false,
  logging: false,
  ssl: false,
  entities: [`${parentDir}/**/*-entity.{js,ts}`],
  migrations: [`${parentDir}/common/db/migrations/*.{js,ts}`]
})

export const getDataSoure = async () => {
  if (!AppDataSource) {
    AppDataSource = await dataSource.initialize()
  }
  return AppDataSource
}
