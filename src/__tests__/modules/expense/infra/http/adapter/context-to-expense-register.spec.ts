import { Utils } from '../../../../../../common/utils/utils'
import { ExpenseRegister } from '../../../../../../modules/expense/domain/expense-register'
import { ContextToExpenseRegister } from '../../../../../../modules/expense/infra/http/adapter/context-to-expense-register'

describe('testing context-to-expense-register adapter', () => {
  it('should convert context to expense-register', () => {
    const expenseToRegister = ContextToExpenseRegister.of({
      global: { user: { id: 1 } },
      request: {
        body: { value: 10, description: 'text description', date: '1991-02-10' }
      }
    })
    expect(expenseToRegister).toBeInstanceOf(ExpenseRegister)
    expect(expenseToRegister.toJson()).toMatchObject({
      date: Utils.convertStringToDate('1991-02-10'),
      description: 'text description',
      user: { email: undefined, id: 1, name: undefined },
      value: 10
    })
  })

  it('should throw validation error if body dont match with schema', () => {
    expect(() => {
      ContextToExpenseRegister.of({
        global: { user: { id: 1 } },
        request: {
          body: { value: -10, description: 'text description', date: '1991-02-10' }
        }
      })
    }).toThrow('ValidationError: body.value must be a positive number')
  })

  it('should throw validation error if body date is in future', () => {
    const future = new Date()
    future.setFullYear(new Date().getFullYear() + 1)
    expect(() => {
      ContextToExpenseRegister.of({
        global: { user: { id: 1 } },
        request: {
          body: {
            value: -10,
            description: 'text description',
            date: `${future.getFullYear()}-${future.getMonth()}-${future.getDate()}`
          }
        }
      })
    }).toThrow('ValidationError: Date invalid: Can not be future')
  })
})
