import { inject, injectable } from 'tsyringe'
import { ExpenseService } from '../domain/expense-service'
import { Expense } from '../domain/expense'
import { ExpenseRegister } from '../domain/expense-register'
import { ExpenseTokensEnum } from '../domain/expense-tokens'
import { ExpenseRepository } from '../domain/expense-repository'
import { ExpenseFilter } from '../domain/expense-filter'
import { ExpenseNotFound } from '../domain/exceptions/expense-not-found'
import { ExpenseNotifierEmail } from '../infra/notifier/expense-notifier-email'

@injectable()
export class ExpenseServiceImpl implements ExpenseService {
  constructor(
    @inject(ExpenseTokensEnum.REPOSITORY)
    protected expenseRepository: ExpenseRepository
  ) {}

  async saveExpense(expenseRegister: ExpenseRegister): Promise<{ id: number }> {
    const expense = await this.expenseRepository.create(expenseRegister)
    this.notifierAfterCreateExpense(expenseRegister)
    return { id: expense.id }
  }

  async updateExpense(
    filter: ExpenseFilter,
    expenseRegister: ExpenseRegister
  ): Promise<void> {
    const result = await this.expenseRepository.update(filter, expenseRegister)
    if (!result) {
      throw new ExpenseNotFound()
    }
  }

  getExpense(filter: ExpenseFilter): Promise<Expense> {
    return this.expenseRepository.getOne(filter)
  }

  getListExpense(filter: ExpenseFilter): Promise<Expense[]> {
    return this.expenseRepository.getList(filter)
  }

  async removeExpense(filter: ExpenseFilter): Promise<void> {
    const result = await this.expenseRepository.delete(filter)
    if (!result) {
      throw new ExpenseNotFound()
    }
    return
  }

  private notifierAfterCreateExpense(expenseRegister: ExpenseRegister) {
    const notifierEmail = new ExpenseNotifierEmail()
    notifierEmail.sendMessage({
      address: expenseRegister.user.email,
      message: 'Uma nova despesa foi cadastrada.'
    })
  }
}
