import { Expense } from './expense'
import { ExpenseFilter } from './expense-filter'
import { ExpenseRegister } from './expense-register'

export interface ExpenseRepository {
  create(expenseRegister: ExpenseRegister): Promise<Expense>
  update(expenseFilter: ExpenseFilter, data: ExpenseRegister): Promise<Expense>
  delete(expenseFilter: ExpenseFilter): Promise<number>
  getList(expenseFilter: ExpenseFilter): Promise<Expense[]>
  getOne(expenseFilter: ExpenseFilter): Promise<Expense>
}
