import { Expense } from './expense'
import { ExpenseFilter } from './expense-filter'
import { ExpenseRegister } from './expense-register'

export interface ExpenseService {
  saveExpense(expenseRegister: ExpenseRegister): Promise<{ id: number }>
  updateExpense(filter: ExpenseFilter, expenseRegister: ExpenseRegister): Promise<void>
  getExpense(filter: ExpenseFilter): Promise<Expense>
  getListExpense(filter: ExpenseFilter): Promise<Expense[]>
  removeExpense(filter: ExpenseFilter): Promise<void>
}
