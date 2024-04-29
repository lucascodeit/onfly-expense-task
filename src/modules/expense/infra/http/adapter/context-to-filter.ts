import { Context } from 'vm'
import { ExpenseFilter } from '../../../domain/expense-filter'

export class ContextToFilter extends ExpenseFilter {
  private constructor(ctx: Context) {
    const { global, params } = ctx
    super({
      id: params.id,
      userId: global.user.id
    })
  }

  static of(ctx: Context): ContextToFilter {
    return new ContextToFilter(ctx)
  }
}
