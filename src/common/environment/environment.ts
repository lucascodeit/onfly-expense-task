import { configDotenv } from 'dotenv'

if (process.env.NODE_ENV == 'test') {
  configDotenv({
    path: '.env.test'
  })
} else {
  configDotenv()
}

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  JWT_KEY: process.env.JWT_KEY
}
