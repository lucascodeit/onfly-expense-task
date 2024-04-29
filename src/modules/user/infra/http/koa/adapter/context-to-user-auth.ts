import { Context } from 'koa'
import { UserAuth } from '../../../../domain/user-auth'

export class ContextToAuth extends UserAuth {
  private constructor(ctx: Context) {
    const body = <any>ctx.request.body
    super({
      email: body.email,
      plainPassword: body.password
    })
  }

  static of(ctx: Context): UserAuth {
    return new ContextToAuth(ctx)
  }
}
