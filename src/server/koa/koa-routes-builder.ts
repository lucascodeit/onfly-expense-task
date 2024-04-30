import Router from '@koa/router'
import { CommonError } from '../../common/exceptions/common-error'

export abstract class KoaRoutesBuilder {
  constructor(protected router: Router) {
    this.router.use(async (ctx, next) => {
      try {
        await next()
      } catch (error) {
        if (error instanceof CommonError) {
          ctx.throw(error.status, error.message)
        } else {
          ctx.throw(500)
        }
      }
    })
  }

  abstract build(): Router
}
