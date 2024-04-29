import { UserEntity } from '../../../../user/infra/db/entities/user-entity'
import { Expense } from '../../../domain/expense'
import { ExpenseRegister } from '../../../domain/expense-register'
import { ExpenseUser } from '../../../domain/user/expense-user'
import { ExpenseEntity } from '../entities/expense-entity'

export class ExpenseEntityToExpense extends Expense {
  private constructor(expense: ExpenseEntity) {
    super({
      date: expense.date,
      description: expense.description,
      id: expense.id,
      user: new ExpenseUser({
        email: expense.user.email,
        id: expense.user.id,
        name: expense.user.name
      }),
      value: expense.value
    })
  }

  static of(expense: ExpenseEntity): Expense {
    return new ExpenseEntityToExpense(expense)
  }
}
