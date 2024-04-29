import { UserEntity } from '../../../../user/infra/db/entities/user-entity'
import { ExpenseRegister } from '../../../domain/expense-register'
import { ExpenseEntity } from '../entities/expense-entity'

export class ExpenseRegisterToExpenseEntity extends ExpenseEntity {
  private constructor(expense: ExpenseRegister) {
    super()
    this.value = expense.value
    this.date = expense.date
    this.description = expense.description
    this.user = new UserEntity()
    this.user.id = expense.user.id
  }

  static of(expense: ExpenseRegister): ExpenseEntity {
    return new ExpenseRegisterToExpenseEntity(expense)
  }
}
