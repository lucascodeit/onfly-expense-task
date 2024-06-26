import Koa from 'koa'
import { createServer } from 'http'
import Router from '@koa/router'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { KoaRoutesBuilder } from './koa-routes-builder'
import { UserKoaRoutes } from '../../modules/user/infra/http/koa/user-koa-routes'
import { userBootstrap } from '../../modules/user/infra/bootstrap/user-bootstrap'
import { userMiddlewareKoa } from '../../modules/user/infra/http/koa/middleware/user-koa-middleware'
import { ExpenseKoaRoutes } from '../../modules/expense/infra/http/expense-koa-routes'
import { expenseBootstrap } from '../../modules/expense/infra/bootstraps/expense-bootstrap'
import environment from '../../common/environment/environment'

bootstrap()

const app = new Koa()
app.use(cors())
const router = new Router()
const protectedRoutes = new Router()

app.use(bodyParser()).use(router.routes()).use(protectedRoutes.routes())

buildRoutes()

createServer(app.callback()).listen(environment.PORT).on('listening', listeningEvent)

function buildRoutes() {
  protectedRoutes.use((ctx, next) => userMiddlewareKoa(ctx, next))

  const routesBuilders: KoaRoutesBuilder[] = [
    new UserKoaRoutes(router),
    new ExpenseKoaRoutes(protectedRoutes)
  ]

  for (const routesBuilder of routesBuilders) {
    routesBuilder.build()
  }
}

function listeningEvent() {
  console.log(`server up and running in http://localhost:${environment.PORT}`)
}

function bootstrap() {
  userBootstrap()
  expenseBootstrap()
}

export { app }
