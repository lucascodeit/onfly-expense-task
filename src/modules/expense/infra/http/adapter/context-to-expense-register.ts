import { Context } from 'vm'
import { ExpenseRegister } from '../../../domain/expense-register'
import { ExpenseUser } from '../../../domain/user/expense-user'
import { ExpenseValidation } from '../../../domain/validations/expense-validations'
import { ExpenseValidationError } from '../../../domain/exceptions/expense-validation-error'
import { Utils } from '../../../../../common/utils/utils'

export class ContextToExpenseRegister extends ExpenseRegister {
  private constructor(ctx: Context) {
    const {
      global,
      request: {
        body: { value, description, date }
      }
    } = ctx
    const user = global?.user
    super({
      date: Utils.convertStringToDate(date),
      description: description,
      user: new ExpenseUser({
        email: user.email,
        id: user.id,
        name: user.name
      }),
      value: value
    })
  }

  static of(ctx: Context): ExpenseRegister {
    try {
      const schema = ExpenseValidation.getExpenseSchema()
      schema.validateSync(ctx.request)
      return new ContextToExpenseRegister(ctx)
    } catch (error) {
      throw new ExpenseValidationError(error.toString())
    }
  }
}
