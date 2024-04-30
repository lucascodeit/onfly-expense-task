import { ExpenseRegister } from '../../../../../../modules/expense/domain/expense-register'
import { ExpenseUser } from '../../../../../../modules/expense/domain/user/expense-user'
import { ExpenseRegisterToExpenseEntity } from '../../../../../../modules/expense/infra/db/adpater/expense-register-to-expense-entity'
import { ExpenseEntity } from '../../../../../../modules/expense/infra/db/entities/expense-entity'
import { UserEntity } from '../../../../../../modules/user/infra/db/entities/user-entity'

describe('testing expense-register-to-expense-entity adapter', () => {
  it('should convert expense-register to expense-entity', () => {
    const date = new Date()
    const mock = {
      date,
      description: 'text description',
      user: new ExpenseUser({ name: 'Lucas', id: 1, email: 'lucas@email.com' }),
      value: 40
    }
    const expenseEntity = ExpenseRegisterToExpenseEntity.of(new ExpenseRegister(mock))
    const userEntity = new UserEntity()
    userEntity.id = 1

    expect(expenseEntity).toBeInstanceOf(ExpenseEntity)
    expect(expenseEntity.user).toMatchObject(userEntity)
    expect(expenseEntity.value).toEqual(mock.value)
    expect(expenseEntity.description).toEqual(mock.description)
    expect(expenseEntity.date).toEqual(date)
  })
})
