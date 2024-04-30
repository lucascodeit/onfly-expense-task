import { Expense } from '../../../../../../modules/expense/domain/expense'
import { ExpenseEntityToExpense } from '../../../../../../modules/expense/infra/db/adpater/expense-entity-to-expense'
import { ExpenseEntity } from '../../../../../../modules/expense/infra/db/entities/expense-entity'
import { UserEntity } from '../../../../../../modules/user/infra/db/entities/user-entity'

describe('testing expense-entity-to-expense adapter', () => {
  it('should convert expense-entity to expense', () => {
    const today = new Date()
    const expenseEntity = new ExpenseEntity()
    expenseEntity.description = 'text description'
    expenseEntity.value = 50
    expenseEntity.id = 1
    expenseEntity.date = today
    expenseEntity.user = new UserEntity()
    expenseEntity.user.id = 1
    expenseEntity.user.name = 'Lucas'
    const expense = ExpenseEntityToExpense.of(expenseEntity)

    expect(expense).toBeInstanceOf(Expense)
    expect(expense.toJson()).toMatchObject({
      date: today,
      description: 'text description',
      id: 1,
      user: { email: undefined, id: 1, name: 'Lucas' },
      value: 50
    })
  })
})
