import { Context } from 'koa'
import { UserRegister } from '../../../../domain/user-register'

export class ContextToUserRegister extends UserRegister {
  private constructor(ctx: Context) {
    const body = <any>ctx.request.body
    super({
      email: body.email,
      name: body.name,
      password: body.password
    })
  }

  static of(ctx: Context): UserRegister {
    return new ContextToUserRegister(ctx)
  }
}
