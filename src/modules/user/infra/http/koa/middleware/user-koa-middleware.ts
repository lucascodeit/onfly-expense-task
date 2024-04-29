import { ParameterizedContext, Next } from 'koa'
import { getUserService } from '../../../bootstrap/user-bootstrap-helpers'
import { CommonError } from '../../../../../../common/exceptions/common-error'

export async function userMiddlewareKoa(ctx: ParameterizedContext, next: Next) {
  try {
    const { authorization = '' } = ctx.header
    const token = authorization.split(' ')
    const user = await getUserService().getByToken(token[1])
    ctx.global = { user: user.toJson(), ...(ctx.global || {}) }
  } catch (error) {
    if (error instanceof CommonError) {
      ctx.throw(error.status, error.message)
    } else {
      ctx.throw(401)
    }
  }
  await next()
}
