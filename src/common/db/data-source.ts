import { DataSource } from 'typeorm'
import { join } from 'path'
import dotenv from 'dotenv'

dotenv.config()

const parentDir = join(__dirname, '..', '..')

let AppDataSource: DataSource

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
