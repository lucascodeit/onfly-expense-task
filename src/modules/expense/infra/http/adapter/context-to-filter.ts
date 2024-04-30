import { Context } from 'vm'
import { ExpenseFilter, ExpenseFilterDTO } from '../../../domain/expense-filter'

export class ContextToFilter extends ExpenseFilter {
  private constructor(ctx: Context) {
    const { global, params } = ctx
    let data: ExpenseFilterDTO = { userId: global.user.id }
    if (params?.id) {
      data = { ...data, id: params.id }
    }
    super(data)
  }

  static of(ctx: Context): ExpenseFilter {
    return new ContextToFilter(ctx)
  }
}
