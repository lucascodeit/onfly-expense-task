import Router from '@koa/router'
import { DefaultState, DefaultContext, Context } from 'koa'
import { KoaRoutesBuilder } from '../../../../../server/koa/koa-routes-builder'
import { ContextToUserRegister } from './adapter/context-to-user-register'
import { getUserService } from '../../bootstrap/user-bootstrap-helpers'
import { UserService } from '../../../domain/user-service'
import { ContextToAuth } from './adapter/context-to-user-auth'
import { UserJWT } from '../../../domain/user-jwt'

export class UserKoaRoutes extends KoaRoutesBuilder {
  private userService: UserService = getUserService()

  build(): Router {
    return this.postUser().postAuth().router
  }

  private postUser() {
    this.router.post('/user', async (ctx: Context) => {
      const result = await this.userService.saveUser(ContextToUserRegister.of(ctx))
      ctx.body = result
    })
    return this
  }

  private postAuth() {
    this.router.post('/user/auth', async (ctx: Context) => {
      const user = await this.userService.auth(ContextToAuth.of(ctx))
      ctx.body = user.toJson()
    })
    return this
  }
}
